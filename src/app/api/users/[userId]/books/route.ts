import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId;

  const db = await getDB();
  const homes = await db.collection('homes').find({ userId: new ObjectId(userId) }).toArray();
  const books = homes.flatMap(home => home.books);

  return NextResponse.json({ books });
}
