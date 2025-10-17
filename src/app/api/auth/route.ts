
'use server';

import {NextResponse} from 'next/server';
import User from '@/models/Authentication_Schema';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDB from '@/config/database';
import mongoose from 'mongoose';

// Helper function for sending JSON responses
function jsonResponse(status: number, data: object) {
  return NextResponse.json(data, {status});
}

// POST handler for registration, login, and user checks
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

    if (action === 'check-user') {
      return await handleCheckUser(body);
    }

    return jsonResponse(400, {error: 'Invalid action specified.'});
  } catch (err: any) {
    if (err.message.includes('connect ECONNREFUSED')) {
        console.error('API Error: Database connection refused.', err);
        return jsonResponse(500, { error: 'Could not connect to the database. Please check your connection string and firewall settings.' });
    }
    console.error('API General Error:', err);
    return jsonResponse(500, {error: 'Server error occurred.'});
  }
}

// --- Handler for User Existence Check ---
async function handleCheckUser(body: any) {
  const { email } = body;
  if (!email) {
    return jsonResponse(400, { error: 'Email is required.' });
  }

  const user = await User.findOne({ email }).lean();
  
  if (user) {
    // User exists, return success but don't leak info.
    return jsonResponse(200, { message: 'User check successful.' });
  } else {
    // User doesn't exist, still return a generic success to prevent enumeration.
    return jsonResponse(200, { message: 'User check successful.' });
  }
}


// --- Handler for User Registration ---
async function handleRegister(body: any) {
  const {UserName, Email, Password, ConfirmPassword} = body;

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

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
    return jsonResponse(400, { error: 'Username must be at least 3 characters' });
  }
  if (Password.length < 12) {
    return jsonResponse(400, { error: 'Password must be at least 12 characters' });
  }

  try {
    // --- Check for existing user ---
    const existingUser = await User.findOne({
      $or: [{email: Email}, {username: UserName}],
    }).lean(); // .lean() makes it faster as it's just a check

    if (existingUser) {
      return jsonResponse(409, {error: 'User with that email or username already exists'});
    }

    // --- Create new user ---
    const hashedPassword = await bcrypt.hash(Password, 12);
    const newUser = new User({
      username: UserName,
      email: Email,
      password: hashedPassword,
    });
    
    await newUser.save();

    // --- Generate Token ---
    const token = jwt.sign(
      {id: newUser._id, email: newUser.email},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    );

    return jsonResponse(201, {
      message: 'Registered successfully',
      user: {id: newUser._id, username: newUser.username, email: newUser.email},
      token,
    });

  } catch (error) {
    // Catch Mongoose validation errors or other DB issues
    if (error instanceof mongoose.Error.ValidationError) {
      // Extract a user-friendly error message
      const messages = Object.values(error.errors).map(e => e.message);
      return jsonResponse(400, { error: messages.join(', ') });
    }
    console.error("Error during user registration:", error);
    return jsonResponse(500, { error: "An error occurred during registration." });
  }
}


// --- Handler for User Login ---
async function handleLogin(body: any) {
  const {email, password} = body;

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

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
    process.env.JWT_SECRET,
    {expiresIn: '7d'}
  );

  return jsonResponse(200, {
    message: 'Login successful',
    user: {id: user._id, username: user.username, email: user.email},
    token,
  });
}
