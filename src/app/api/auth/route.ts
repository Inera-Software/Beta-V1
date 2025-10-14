import { NextResponse } from "next/server";

// In-memory users array (for dev only)
let users: { username: string; email: string; password: string }[] = [];

export async function POST(request: Request) {
  const body = await request.json();

  if (body.action === "register") {
    const { username, email, password } = body;
    // Validate fields
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email, and password required." }, { status: 400 });
    }

    // Check for existing username and email
    if (users.some(user => user.username === username)) {
      return NextResponse.json({ error: "Username already exists." }, { status: 409 });
    }
    if (users.some(user => user.email === email)) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 });
    }

    // Register new user
    users.push({ username, email, password });
    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  }

  if (body.action === "login") {
    const { email, password } = body;
    // Check hardcoded credentials first
    if (email === "test@inera.com" && password === "password123") {
      return NextResponse.json({ success: true });
    }

    // Check user array for email/username and password
    const user = users.find(user => 
      (user.email === email || user.username === email) && user.password === password
    );

    if (user) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
