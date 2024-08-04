import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(params.userId) });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching user:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
