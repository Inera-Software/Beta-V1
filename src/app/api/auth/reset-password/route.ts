
'use server';

import {NextResponse} from 'next/server';
import User from '@/models/Authentication_Schema';
import connectToDB from '@/config/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required.'),
  password: z.string().min(12, 'Password must be at least 12 characters.'),
});

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();

    const validation = resetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }

    const { token, password } = validation.data;
    
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined.');
        throw new Error('Server configuration error.');
    }

    let decoded: any;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
    }

    if (typeof decoded !== 'object' || !decoded.id) {
        return NextResponse.json({ error: 'Invalid token payload.' }, { status: 400 });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({ message: 'Password has been reset successfully.' }, { status: 200 });

  } catch (err: any) {
    console.error('Reset Password API Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
