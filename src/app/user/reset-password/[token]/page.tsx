'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 12) {
      setError("Password must be at least 12 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });
        
        const data = await response.json();

        if (response.ok) {
            setMessage("Password has been successfully reset!");
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => router.push("/user/login"), 3000);
        } else {
            setError(data.error || 'An unexpected error occurred.');
        }

    } catch(err) {
        setError('Failed to connect to the server. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md"
        noValidate
      >
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
                    Set New Password
                </CardTitle>
                <CardDescription className="text-center text-base text-gray-300 mt-2">
                    Enter and confirm your new password.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {message ? (
                <div className="text-center space-y-4">
                  <p className="text-green-400">{message}</p>
                  <Link href="/user/login" className="text-primary hover:underline font-medium">
                      Proceed to Login
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">New Password</label>
                          <Input
                              id="password"
                              type="password"
                              placeholder="••••••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="confirmPassword">Confirm New Password</label>
                          <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="••••••••••••"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                          />
                      </div>
                  </div>

                  {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

                  <Button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-6 py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-bold text-base tracking-wide"
                  >
                      {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                </>
              )}
            </CardContent>
        </Card>
      </form>
    </div>
  );
}
