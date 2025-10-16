
'use server';

import {NextResponse} from 'next/server';
import User from '@/models/Authentication_Schema';
import connectToDB from '@/config/database';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// In a real app, you would use a service like Nodemailer to send emails
// For now, we will log the link to the console for demonstration
const sendPasswordResetEmail = (email: string, token: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/user/reset-password/${token}`;
    console.log(`--- PASSWORD RESET ---`);
    console.log(`Email to: ${email}`);
    console.log(`Reset Link: ${resetLink}`);
    console.log(`--------------------`);
};

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables.');
      throw new Error('Server configuration error.');
    }

    const user = await User.findOne({ email });

    if (!user) {
      // To prevent email enumeration, we send a success response even if the user doesn't exist.
      // This is a common security practice.
      return NextResponse.json({ message: 'If a user with that email exists, a reset link has been sent.' }, { status: 200 });
    }
    
    // Create a short-lived token for password reset
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // Token is valid for 15 minutes
    );

    // In a real app, you'd send an email here.
    sendPasswordResetEmail(user.email, token);

    return NextResponse.json({ message: 'If a user with that email exists, a reset link has been sent.' }, { status: 200 });

  } catch (err: any) {
    console.error('Forgot Password API Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
