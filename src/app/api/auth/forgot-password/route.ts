
'use server';

import {NextResponse} from 'next/server';
import User from '@/models/Authentication_Schema';
import connectToDB from '@/config/database';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const sendPasswordResetEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/user/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_SERVER_USER,
        to: email,
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
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to: ${email}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        // We throw an error here to be caught by the main handler,
        // so the client doesn't get a success message if the email fails.
        throw new Error('Could not send password reset email.');
    }
};

export async function POST(request: Request) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables.');
      throw new Error('Server configuration error: JWT secret is missing.');
    }
    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
        console.error('Email server credentials are not defined in environment variables.');
        throw new Error('Server configuration error: Email credentials are not set.');
    }

    await connectToDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // To prevent email enumeration, we send a success response even if the user doesn't exist.
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
    // Avoid leaking detailed error messages to the client
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
