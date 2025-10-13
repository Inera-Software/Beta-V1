'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RegisterSignup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState({ username: '', password: '', server: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let newError = { username: '', password: '', server: '' };
    if (!form.username) newError.username = "Please enter your username.";
    if (!form.password) newError.password = "Please enter your password.";
    setError(newError);
    if (newError.username || newError.password) return;

    setLoading(true);
    setError({ username: '', password: '', server: '' });

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "register", username: form.username, password: form.password }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        setError({ ...error, server: data.error || data.message || 'Registration failed.' });
        setLoading(false);
      }
    } catch {
      setError({ ...error, server: "Server error. Please try again." });
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center px-2 bg-[hsl(224,80%,2%)]"
      style={{
        fontFamily: "'Roboto', 'Montserrat', Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg"
      >
        <Card className="relative border border-white border-opacity-15 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl px-8 py-10 sm:px-12 sm:py-12 flex flex-col gap-1">
          <CardHeader className="flex flex-col items-center mb-2">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="INERA Logo"
              className="mb-4 w-16 h-16 object-contain drop-shadow-lg"
              style={{ background: 'transparent' }}
            />
            <CardTitle
              className="text-center text-3xl md:text-4xl font-extrabold tracking-widest"
              style={{ fontFamily: "'Montserrat', Arial, sans-serif", color: "hsl(45,100%,50%)" }}
            >
              INERA
            </CardTitle>
            <CardDescription className="text-center text-lg text-white mt-2" style={{ fontFamily: "'Roboto', Arial, sans-serif" }}>
              Sign up for INERA Navigator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2 text-white text-base md:text-lg">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Choose a username"
                required
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-[12px] text-base md:text-lg bg-white/30 backdrop-blur-md text-white placeholder:text-white/80 border border-[hsl(45,100%,60%)] focus:ring-2 focus:ring-[hsl(45,100%,50%)] outline-none transition font-medium shadow-sm"
                style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
              />
              {error.username && (
                <p className="text-[hsl(45,100%,50%)] mt-1 text-xs">{error.username}</p>
              )}
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="block mb-2 text-white text-base md:text-lg">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-[12px] text-base md:text-lg bg-white/30 backdrop-blur-md text-white placeholder:text-white/80 border border-[hsl(45,100%,60%)] focus:ring-2 focus:ring-[hsl(45,100%,50%)] outline-none transition font-medium shadow-sm"
                style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
              />
              {error.password && (
                <p className="text-[hsl(45,100%,50%)] mt-1 text-xs">{error.password}</p>
              )}
            </div>
            {error.server && (
              <div className="mb-4 text-center text-[hsl(45,100%,50%)] text-sm">{error.server}</div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[12px] bg-[hsl(45,100%,50%)] hover:bg-white transition text-[hsl(224,80%,2%)] font-bold text-base md:text-lg tracking-wide mt-1 shadow-md"
              style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
