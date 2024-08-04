import { getDB } from '../../../lib/db';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(request: Request) {
  const { name, password } = await request.json();

  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ name });

    if (!user) {
      return NextResponse.json({ message: 'Invalid name or password' }, { status: 401 });
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ message: 'Invalid name or password' }, { status: 401 });
    }

    const token = sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '24h' });

    const response = NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error during login:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
