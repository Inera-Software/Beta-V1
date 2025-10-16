
'use server';

import { NextResponse } from 'next/server';
import User from '@/models/Authentication_Schema';
import connectToDB from '@/config/database';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const sendPasswordResetEmail = async (email: string, token: string) => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('Server configuration error: SendGrid API Key is missing.');
  }
  if (!process.env.SENDGRID_FROM_EMAIL) {
    throw new Error('Server configuration error: SendGrid From Email is missing.');
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/user/reset-password/${token}`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL, // Use a verified sender email address
    subject: 'Password Reset for INERA Navigator',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Password Reset Request</h2>
          <p>You are receiving this email because a password reset request was initiated for your account.</p>
          <p>Click the link below to reset your password. This link is valid for 15 minutes.</p>
          <a href="${resetLink}" style="background-color: #FFD700; color: #222D5C; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email.</p>
          <hr/>
          <p>Thank you,</p>
          <p>The INERA Team</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Password reset email sent to: ${email}`);
  } catch (error: any) {
    console.error('Error sending password reset email with SendGrid:', error);
    let errorMessage = 'Could not send password reset email.';
    if (error.response) {
      // Extract more specific error from SendGrid's response
      const sendGridError = error.response.body.errors[0];
      if (sendGridError) {
        errorMessage = sendGridError.message;
      }
      console.error(error.response.body);
    }
    throw new Error(errorMessage);
  }
};

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

    if (!user) {
      // To prevent email enumeration, we send a success response even if the user doesn't exist.
      console.log(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });
    }
    
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // Token is valid for 15 minutes
    );

    // Send the actual email
    await sendPasswordResetEmail(user.email, token);

    return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });

  } catch (err: any) {
    console.error('Forgot Password API Error:', err.message);
    // Now this will return the specific error from SendGrid or a fallback.
    return NextResponse.json({ error: err.message || 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
