
'use server';

import { NextResponse } from 'next/server';
import User from '@/models/Authentication_Schema';
import connectToDB from '@/config/database';
import jwt from 'jsonwebtoken';

// In a real app, this would use an email service like SendGrid
// For this demo, we generate a token and return it directly.
// const sendPasswordResetEmail = async (email: string, token: string) => { ... };

export async function POST(request: Request) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('Server configuration error: JWT secret is missing.');
    }
    
    await connectToDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    // To prevent user enumeration, we don't reveal if the user was found or not.
    // If a user is found, we proceed. If not, we return a generic success message
    // as if an email was sent, which is a security best practice.
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`);
      // Return a generic success response to prevent email enumeration attacks
      return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });
    }
    
    // User was found, generate a real token for them.
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // Token is valid for 15 minutes
    );

    // In a real app, you would email this token to the user.
    // await sendPasswordResetEmail(user.email, token);
    
    // For our secure demo, we return the token directly to the client.
    return NextResponse.json({ message: 'Token generated.', token: token }, { status: 200 });

  } catch (err: any) {
    console.error('Forgot Password API Error:', err.message);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
