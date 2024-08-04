import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  if (!ObjectId.isValid(userId)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  const db = await getDB();
  const homes = await db.collection('homes').find({ userId: new ObjectId(userId) }).toArray();

  return NextResponse.json({ homes }, { status: 200 });
}
