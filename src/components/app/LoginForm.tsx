'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = "/api/auth";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let newError = { email: "", password: "", server: "" };
    if (!user.email) newError.email = "Please enter your email.";
    if (!user.password) newError.password = "Please enter your password.";
    setError(newError);
    if (newError.email || newError.password) return;

    setLoading(true);
    setError({ email: "", password: "", server: "" });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email: user.email, password: user.password })
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        setError((prev) => ({ ...prev, server: data.error || "Invalid credentials." }));
      }
    } catch (err) {
      setError((prev) => ({ ...prev, server: "Network error. Please try again." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[hsl(224,80%,2%)] font-sans">
      <form
        className="w-full max-w-md px-8 py-10 rounded-[12px] shadow-lg bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10"
        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="mb-4"
            priority
          />
          <span
            className="inline-block text-3xl font-extrabold tracking-widest"
            style={{ color: "hsl(45, 100%, 50%)" }}
          >
            QuickiS
          </span>
          <h2 className="mt-4 text-white text-xl font-medium">
            Login to your account
          </h2>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-white" htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            placeholder="Enter email"
            className="w-full px-4 py-3 rounded-[12px] bg-white bg-opacity-20 text-white placeholder:text-white/70 border border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] outline-none transition"
            value={user.email}
            onChange={handleChange}
            required
          />
          {error.email && <p className="text-[#FFD700] mt-1 text-xs">{error.email}</p>}
        </div>
        <div className="mb-8">
          <label className="block mb-2 text-white" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-[12px] bg-white bg-opacity-20 text-white placeholder:text-white/70 border border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] outline-none transition"
            value={user.password}
            onChange={handleChange}
            required
          />
          {error.password && <p className="text-[#FFD700] mt-1 text-xs">{error.password}</p>}
        </div>
        {error.server && <div className="mb-4 text-center text-[#FFD700] text-sm">{error.server}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-[12px] bg-[#FFD700] hover:bg-white transition text-[#222D5C] font-bold text-base tracking-wide"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <div className="mt-5 text-center">
          <span className="text-white text-sm">Forgot your password?</span>
          <a href="#" className="ml-2 text-[#FFD700] hover:underline text-sm">Reset</a>
        </div>
        <div className="mt-3 text-center">
          <span className="text-white text-sm">New user?</span>
          <Link
            href="/register"
            className="ml-2 text-[#FFD700] hover:underline text-sm"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
