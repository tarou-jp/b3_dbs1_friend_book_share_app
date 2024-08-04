import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { homeId: string } }) {
  const homeId = params.homeId;

  const db = await getDB();
  const home = await db.collection('homes').findOne({ _id: new ObjectId(homeId) });

  if (!home) {
    return NextResponse.json({ message: 'Home not found' }, { status: 404 });
  }

  return NextResponse.json({ books: home.books });
}
