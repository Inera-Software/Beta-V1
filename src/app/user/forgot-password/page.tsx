'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    
    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
            setEmail("");
        } else {
            setError(data.error || 'An unexpected error occurred.');
        }
    } catch (err) {
        setError('Failed to connect to the server. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
        <Card className="border border-primary/20 rounded-2xl shadow-2xl bg-card/80 backdrop-blur-xl p-6 md:p-8 flex flex-col">
          <CardHeader className="p-0 flex flex-col items-center mb-6">
             <Image
              src="/logo.png"
              alt="INERA Logo"
              width={56}
              height={56}
              className="mb-3 object-contain drop-shadow-lg animate-pulse"
              priority
            />
            <CardTitle className="text-center text-3xl font-extrabold tracking-widest text-primary">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-300 mt-2">
              Enter your email to receive a password reset link.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
             {message ? (
              <div className="text-center text-green-400 bg-green-900/20 p-4 rounded-lg">
                {message}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-bold text-base tracking-wide"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </>
            )}
            <div className="mt-6 text-center text-sm">
                <Link href="/user/login" className="text-primary hover:underline font-medium">
                    Back to Login
                </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
