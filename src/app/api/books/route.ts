import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const { userId, title, homeId, details } = await request.json();

  const db = await getDB();
  const book = {
    _id: new ObjectId(),
    title,
    details,
    status: 'available',
  };

  const result = await db.collection('homes').updateOne(
    { _id: new ObjectId(homeId), userId: new ObjectId(userId) },
    { $push: { books: book as any } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: 'Failed to add book to home' }, { status: 500 });
  }

  return NextResponse.json({ success: true, book }, { status: 201 });
}
