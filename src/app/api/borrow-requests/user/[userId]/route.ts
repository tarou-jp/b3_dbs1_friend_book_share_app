import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const db = await getDB();
  const userId = new ObjectId(params.userId);
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  let filter: any = { ownerId: userId }; 
  if (type === 'requests') {
    filter = { ownerId: userId };
  } else if (type === 'results') {
    filter = { userId };
  }

  const borrowRequests = await db.collection('borrowRequests').find(filter).toArray();
  return NextResponse.json({ borrowRequests });
}
