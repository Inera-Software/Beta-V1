import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Dummy logic; replace with real auth as needed
  if (email === "test@inera.com" && password === "password123") {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
}
