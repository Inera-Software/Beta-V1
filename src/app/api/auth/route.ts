'use server';

import {NextResponse} from 'next/server';
import User from '@/models/Authentication_Schema';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDB from '@/config/database';

// Helper function for sending JSON responses
function jsonResponse(status: number, data: object) {
  return NextResponse.json(data, {status});
}

// POST handler for both registration and login
export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const {action} = body;

    if (action === 'register') {
      return await handleRegister(body);
    }

    if (action === 'login') {
      return await handleLogin(body);
    }

    return jsonResponse(400, {error: 'Invalid action specified.'});
  } catch (err) {
    console.error('API Error:', err);
    return jsonResponse(500, {error: 'Server error occurred.'});
  }
}

// --- Handler for User Registration ---
async function handleRegister(body: any) {
  const {UserName, Email, Password, ConfirmPassword} = body;

  // --- Validation ---
  if (!UserName || !Email || !Password || !ConfirmPassword) {
    return jsonResponse(400, {error: 'All fields are required'});
  }
  if (!validator.isEmail(Email)) {
    return jsonResponse(400, {error: 'Please enter a valid email address'});
  }
  if (Password !== ConfirmPassword) {
    return jsonResponse(400, {error: 'Passwords do not match'});
  }
  if (UserName.length < 3) {
    return jsonResponse(400, {
      error: 'Username must be at least 3 characters',
    });
  }
  if (Password.length < 12) {
    return jsonResponse(400, {
      error: 'Password must be at least 12 characters',
    });
  }

  // --- Check for existing user ---
  const existingUser = await User.findOne({
    $or: [{email: Email}, {username: UserName}],
  });
  if (existingUser) {
    return jsonResponse(409, {error: 'User with that email or username already exists'});
  }

  // --- Create new user ---
  const hashedPassword = await bcrypt.hash(Password, 12);
  const newUser = await User.create({
    username: UserName,
    email: Email,
    password: hashedPassword,
  });

  // --- Generate Token ---
  const token = jwt.sign(
    {id: newUser._id, email: newUser.email},
    process.env.JWT_SECRET!,
    {expiresIn: '7d'}
  );

  return jsonResponse(201, {
    message: 'Registered successfully',
    user: {id: newUser._id, username: newUser.username, email: newUser.email},
    token,
  });
}

// --- Handler for User Login ---
async function handleLogin(body: any) {
  const {email, password} = body;

  // --- Validation ---
  if (!email || !password) {
    return jsonResponse(400, {error: 'Email/Username and password are required'});
  }

  // --- Find User ---
  const user = await User.findOne({
    $or: [{email: email}, {username: email}],
  }).select('+password');

  if (!user) {
    return jsonResponse(404, {error: 'Invalid credentials'});
  }

  // --- Check Password ---
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return jsonResponse(404, {error: 'Invalid credentials'});
  }

  // --- Generate Token ---
  const token = jwt.sign(
    {id: user._id, email: user.email},
    process.env.JWT_SECRET!,
    {expiresIn: '7d'}
  );

  return jsonResponse(200, {
    message: 'Login successful',
    user: {id: user._id, username: user.username, email: user.email},
    token,
  });
}
