import { getDB } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const db = await getDB();
  const homes = await db.collection('homes').find().toArray();
  return NextResponse.json({ homes });
}

export async function POST(request: Request) {
  const { userId, name, building, roomNumber, latitude, longitude } = await request.json();
  const db = await getDB();
  
  try {
    const result = await db.collection('homes').insertOne({
      userId: new ObjectId(userId),
      name,
      building,
      roomNumber,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      books: []
    });
    
    return NextResponse.json({ success: true, homeId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating home:', error);
    return NextResponse.json({ success: false, message: 'Failed to create home' }, { status: 500 });
  }
}