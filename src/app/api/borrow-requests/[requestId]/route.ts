import { getDB } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PATCH(request: NextRequest) {
  const requestId: string = request.nextUrl.pathname.split('/').pop() || '';
  const { action } = await request.json();

  if (!ObjectId.isValid(requestId)) {
    return NextResponse.json({ message: 'Invalid request ID' }, { status: 400 });
  }

  const db = await getDB();

  let status;
  switch (action) {
    case 'approve':
      status = 'approved';
      break;
    case 'reject':
      status = 'rejected';
      break;
    case 'borrowed':
      status = 'borrowed';
      break;
    case 'returned':
      status = 'returned';
      break;
    default:
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  }

  const borrowRequest = await db.collection('borrowRequests').findOne({ _id: new ObjectId(requestId) });

  if (!borrowRequest) {
    return NextResponse.json({ message: 'Borrow request not found' }, { status: 404 });
  }

  try {
    if (status === 'approved') {
      const isAvailable = await ensureBookAvailability(new ObjectId(borrowRequest.bookId));
      if (!isAvailable) {
        return NextResponse.json({ message: 'Book is not available for borrowing' }, { status: 400 });
      }
    }

    await db.collection('borrowRequests').updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status } }
    );

    if (status === 'approved' || status === 'borrowed' || status === 'returned') {
      const bookStatus = status === 'approved' || status === 'borrowed' ? 'borrowed' : 'available';
      await updateBookStatus(new ObjectId(borrowRequest.bookId), bookStatus);
    }

    return NextResponse.json({ message: 'Borrow request updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Operation failed', error: (error as Error).message }, { status: 500 });
  }
}

export async function ensureBookAvailability(bookId: ObjectId): Promise<boolean> {
  const db = await getDB();
  const home = await db.collection('homes').findOne({ 'books._id': bookId });
  if (!home) {
    throw new Error('Home not found');
  }

  const book = home.books.find((b: any) => b._id.equals(bookId));
  return book.status === 'available';
}

export async function updateBookStatus(bookId: ObjectId, status: string) {
  const db = await getDB();
  await db.collection('homes').updateOne(
    { 'books._id': bookId },
    { $set: { 'books.$.status': status } }
  );
}


