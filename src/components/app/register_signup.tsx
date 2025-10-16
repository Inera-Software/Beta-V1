'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(prev => ({ ...prev, [name]: '', server: '' }));
  }

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;
    let newError = { username: '', email: '', password: '', confirmPassword: '', server: '' };

    // Client-side validation
    if (!form.username) {
      newError.username = "Please enter a username.";
      hasError = true;
    } else if (form.username.length < 3) {
      newError.username = "Username must be at least 3 characters.";
      hasError = true;
    }

    if (!form.email) {
      newError.email = "Please enter your email.";
      hasError = true;
    } else if (!validateEmail(form.email)) {
      newError.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!form.password) {
      newError.password = "Please enter a password.";
      hasError = true;
    } else if (form.password.length < 12) {
      newError.password = "Password must be at least 12 characters.";
      hasError = true;
    }

    if (form.password !== form.confirmPassword) {
      newError.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    setError(newError);
    if (hasError) return;

    setLoading(true);
    setError(prev => ({ ...prev, server: '' }));

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "register",
          UserName: form.username,
          Email: form.email,
          Password: form.password,
          ConfirmPassword: form.confirmPassword
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("User registered successfully!");
        router.push('/dashboard'); // Redirect after successful registration
      } else {
        // Show server-side validation errors
        alert(data.error || 'Registration failed.');
        setError(prev => ({ ...prev, server: data.error || 'Registration failed.' }));
      }
    } catch (err) {
      alert("Server error. Please try again.");
      setError(prev => ({ ...prev, server: "Server error. Please try again." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
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
              QuickiS
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-300 mt-2">
              Create Your INERA Navigator Account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              {["username", "email", "password", "confirmPassword"].map(field => (
                <div key={field}>
                  <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor={field}>
                    {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field.toLowerCase().includes("password") ? "password" : "text"}
                    placeholder={field === "username" ? "Choose a unique username" : field === "email" ? "you@example.com" : "********"}
                    required
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 text-white placeholder:text-gray-500 border border-input focus:ring-2 focus:ring-primary outline-none transition duration-300"
                  />
                  {(error as any)[field] && <p className="text-red-400 mt-2 text-xs">{(error as any)[field]}</p>}
                </div>
              ))}
            </div>

            {error.server && <div className="mt-6 text-center text-red-400 text-sm p-2 bg-red-900/20 rounded-md">{error.server}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-bold text-base tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-400">Already have an account?</span>
              <Link href="/user/login" className="ml-1.5 text-primary hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
