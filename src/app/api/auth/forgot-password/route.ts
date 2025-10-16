
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resetLink = `${baseUrl}/user/reset-password/${token}`;
  const logoUrl = `${baseUrl}/logo.png`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Password Reset for INERA Navigator',
    html: `
      <div style="background-color: #01040A; color: #ffffff; font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 30px;">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="${logoUrl}" alt="INERA Logo" width="80" style="display: block; border: 0;" />
                    <h1 style="color: #FFD700; margin-top: 10px; font-size: 24px;">INERA Navigator</h1>
                  </td>
                </tr>
                <tr>
                  <td style="color: #c9d1d9; font-size: 16px;">
                    <h2 style="color: #ffffff; margin-top: 0;">Password Reset Request</h2>
                    <p>You are receiving this email because a password reset request was initiated for your account.</p>
                    <p>Click the button below to reset your password. This link is valid for 15 minutes.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${resetLink}" style="background-color: #FFD700; color: #01040A; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">Reset Password</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #c9d1d9; font-size: 16px;">
                    <p>If you did not request a password reset, please ignore this email or contact our support if you have concerns.</p>
                    <hr style="border: 0; border-top: 1px solid #30363d; margin: 20px 0;" />
                    <p style="font-size: 14px; color: #8b949e;">Thank you,<br/>The INERA Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Password reset email sent to: ${email}`);
  } catch (error: any) {
    console.error('Error sending password reset email with SendGrid:', error);
    if (error.response && error.response.body && error.response.body.errors) {
      throw new Error(error.response.body.errors.map((e: any) => e.message).join(', '));
    }
    throw error;
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
      console.log(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });
    }
    
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    await sendPasswordResetEmail(user.email, token);

    return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });

  } catch (err: any) {
    console.error('Forgot Password API Error:', err.message);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
