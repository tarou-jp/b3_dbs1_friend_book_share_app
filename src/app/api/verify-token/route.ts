import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

interface TokenPayload {
  id: string;
  name: string;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const token = cookieHeader?.split(';').find(cookie => cookie.trim().startsWith('token='))?.split('=')[1];

  if (!token) {
    console.error('Token not found');
    return NextResponse.json({ message: 'Token not found' }, { status: 401 });
  }

  try {
    const decoded = verify(token, JWT_SECRET) as TokenPayload;
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      console.log('Token verified successfully:', decoded);
      return NextResponse.json({ userId: decoded.id });
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
