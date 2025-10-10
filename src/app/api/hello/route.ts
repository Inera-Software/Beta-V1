// This is an API Route Handler. It's a backend endpoint.
// A backend developer would work on this file.
// It can be accessed at http://localhost:3000/api/hello

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // In a real app, you could fetch data from a database here.
  return NextResponse.json({ message: 'Hello from the Next.js Backend!' });
}
