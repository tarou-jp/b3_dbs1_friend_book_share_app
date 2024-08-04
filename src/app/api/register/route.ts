import { getDB } from '../../../lib/db';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, password } = await request.json();
  const hashedPassword = await hash(password, 10);

  try {
    const db = await getDB();
    const result = await db.collection('users').insertOne({
      name,
      password: hashedPassword
    });

    return NextResponse.json({ user: { id: result.insertedId, name } }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error during registration:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
