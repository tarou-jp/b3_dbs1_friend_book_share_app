import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = parseFloat(searchParams.get('latitude') || '0');
  const longitude = parseFloat(searchParams.get('longitude') || '0');

  if (isNaN(latitude) || isNaN(longitude)) {
    return NextResponse.json({ message: 'Invalid latitude or longitude' }, { status: 400 });
  }

  try {
    const db = await getDB();
    const homes = await db.collection('homes').find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: 10000 // 10km以内のホームを検索
        }
      }
    }).toArray();

    return NextResponse.json({ homes }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching nearby homes:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
