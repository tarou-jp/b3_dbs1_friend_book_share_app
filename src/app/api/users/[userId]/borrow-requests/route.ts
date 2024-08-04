import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId;

  const db = await getDB();
  const borrowRequests = await db.collection('borrowRequests').find({ userId: new ObjectId(userId) }).toArray();

  return NextResponse.json({ borrowRequests });
}
