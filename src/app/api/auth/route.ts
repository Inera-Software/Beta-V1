import { NextResponse } from "next/server";

// In-memory users array (for dev only)
let users: { username: string; email: string; password: string }[] = [];
let users: { username: string; password: string }[] = [];

export async function POST(request: Request) {
  const body = await request.json();

  if (body.action === "register") {
    const { username, email, password } = body;
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email, and password required." }, { status: 400 });
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required." }, { status: 400 });
    }
    if (users.some(user => user.username === username)) {
      return NextResponse.json({ error: "Username already exists." }, { status: 409 });
    }
    if (users.some(user => user.email === email)) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 });
    }

    users.push({ username, email, password });
    users.push({ username, password });
    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  }

  if (body.action === "login") {
    const { email, password } = body;
    // Simple test user check
    if (email === "test@inera.com" && password === "password123") {
      return NextResponse.json({ success: true });
    }
    if (users.some(user => user.email === email && user.password === password)) {
    if (email === "test@inera.com" && password === "password123") {
      return NextResponse.json({ success: true });
    }
    if (users.some(user => user.username === email && user.password === password)) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
