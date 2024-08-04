import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const { userId, bookId, startDate, endDate } = await request.json();
  const db = await getDB();
  const home = await db.collection('homes').findOne({ 'books._id': new ObjectId(bookId) });

  if (!home) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  const book = home.books.find((b: any) => b._id.toString() === bookId);

  if (book.status !== 'available') {
    return NextResponse.json({ message: 'Book is not available for borrowing' }, { status: 400 });
  }

  const result = await db.collection('borrowRequests').insertOne({
    userId: new ObjectId(userId),
    ownerId: new ObjectId(home.userId),
    bookId: new ObjectId(bookId),
    bookTitle: book.title,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    requestDate: new Date(),
    status: 'pending'
  });

  return NextResponse.json({ borrowRequest: { id: result.insertedId, userId, bookId, startDate, endDate, status: 'pending' } }, { status: 201 });
}
