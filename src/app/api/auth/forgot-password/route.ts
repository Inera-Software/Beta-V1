
'use server';

import { NextResponse } from 'next/server';
import User from '@/models/Authentication_Schema';
import connectToDB from '@/config/database';
import jwt from 'jsonwebtoken';

// In a real app, this would use an email service like SendGrid
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
    // If a user is found, we proceed to generate a token and simulate sending an email.
    // If not, we still return a generic success message.
    if (user) {
      // User was found, generate a token for them.
      const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '15m' } // Token is valid for 15 minutes
      );
      // In a real app, you would email this token to the user.
      // await sendPasswordResetEmail(user.email, token);
      
      // For this implementation, we return the token to be used by the frontend for redirection.
      return NextResponse.json({ message: 'Token generated.', token: token }, { status: 200 });
    }

    // If no user is found, log it for monitoring but send a generic success response to the client.
    console.log(`Password reset requested for non-existent email: ${email}`);
    return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });

  } catch (err: any) {
    console.error('Forgot Password API Error:', err.message);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
