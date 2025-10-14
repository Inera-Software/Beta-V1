'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RegisterSignup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    server: ''
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(prev => ({ ...prev, [name]: '', server: '' }));
  }

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let newError = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      server: ''
    };

    if (!form.username) newError.username = "Please enter your username.";
    if (!form.email) {
      newError.email = "Please enter your email.";
    } else if (!validateEmail(form.email)) {
      newError.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newError.password = "Please enter your password.";
    } else if (form.password.length < 8) {
      newError.password = "Password must be at least 8 characters long.";
    }
    if (!form.confirmPassword) {
      newError.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newError.confirmPassword = "Passwords do not match.";
    }

    setError(newError);
    if (Object.values(newError).some(err => err !== '')) return;

    setLoading(true);
    setError(prev => ({ ...prev, server: '' }));

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "register",
          username: form.username,
          email: form.email,
          password: form.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        setError(prev => ({
          ...prev,
          server: data.error || data.message || 'Registration failed.'
        }));
        setLoading(false);
      }
    } catch (err) {
      setError(prev => ({ ...prev, server: "Server error. Please try again." }));
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-2 bg-[hsl(224,80%,2%)]"
      style={{ fontFamily: "'Roboto', 'Montserrat', Arial, sans-serif" }}
    >
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Card className="border border-white border-opacity-15 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl px-6 py-8 flex flex-col">
          <CardHeader className="flex flex-col items-center mb-4">
            <img
              src="/logo.png"
              alt="INERA Logo"
              className="mb-2 w-12 h-12 object-contain drop-shadow-lg"
            />
            <CardTitle
              className="text-center text-2xl md:text-3xl font-extrabold tracking-widest mb-1"
              style={{ color: "hsl(45, 100%, 50%)" }}
            >
              QuickiS
            </CardTitle>
            <CardDescription className="text-center text-base text-white mt-1">
              Sign Up for INERA Navigator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <label className="block mb-1 text-white text-sm md:text-base" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Choose a username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[12px] text-base md:text-lg bg-white/30 backdrop-blur-md text-white placeholder:text-white/80 border border-[hsl(45,100%,60%)] focus:ring-2 focus:ring-[hsl(45,100%,50%)] outline-none transition font-medium shadow-sm mb-4"
              style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
            />
            {error.username && <p className="text-[hsl(45,100%,50%)] mt-1 text-xs">{error.username}</p>}

            <label className="block mb-1 text-white text-sm md:text-base" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[12px] text-base md:text-lg bg-white/30 backdrop-blur-md text-white placeholder:text-white/80 border border-[hsl(45,100%,60%)] focus:ring-2 focus:ring-[hsl(45,100%,50%)] outline-none transition font-medium shadow-sm mb-4"
              style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
            />
            {error.email && <p className="text-[hsl(45,100%,50%)] mt-1 text-xs">{error.email}</p>}

            <label className="block mb-1 text-white text-sm md:text-base" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[12px] text-base md:text-lg bg-white/30 backdrop-blur-md text-white placeholder:text-white/80 border border-[hsl(45,100%,60%)] focus:ring-2 focus:ring-[hsl(45,100%,50%)] outline-none transition font-medium shadow-sm mb-4"
              style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
            />
            {error.password && <p className="text-[hsl(45,100%,50%)] mt-1 text-xs">{error.password}</p>}

            <label className="block mb-1 text-white text-sm md:text-base" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[12px] text-base md:text-lg bg-white/30 backdrop-blur-md text-white placeholder:text-white/80 border border-[hsl(45,100%,60%)] focus:ring-2 focus:ring-[hsl(45,100%,50%)] outline-none transition font-medium shadow-sm mb-4"
              style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
            />
            {error.confirmPassword && <p className="text-[hsl(45,100%,50%)] mt-1 text-xs">{error.confirmPassword}</p>}

            {error.server && <div className="mb-4 text-center text-[hsl(45,100%,50%)] text-sm">{error.server}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[12px] bg-[hsl(45,100%,50%)] hover:bg-white transition text-[hsl(224,80%,2%)] font-bold text-base md:text-lg tracking-wide shadow-md"
              style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
