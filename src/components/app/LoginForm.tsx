'use client'
import { useState } from "react";

export default function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = "/api/login"; // Change this to your backend endpoint if needed

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
        body: JSON.stringify(user)
      });
      if (response.ok) {
        window.location.href = "/dashboard"; // Change as needed
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
    <div className="min-h-screen flex justify-center items-center bg-[#020817] font-sans">
      <form
        className="w-full max-w-md px-8 py-10 rounded-xl shadow-lg bg-[#020817] bg-opacity-90 backdrop-blur-lg border border-white border-opacity-10"
        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-10">
          {/* Logo added above brand name */}
          <img
            src="/logo.png" // Change path to your logo file
            alt="INERA Logo"
            className="mx-auto mb-4 w-20 h-20 object-contain"
          />
          <span className="inline-block text-3xl font-extrabold text-[#FFD700] tracking-widest">INERA</span>
          <h2 className="mt-4 text-white text-xl font-medium">Login to your account</h2>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-white" htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            placeholder="Enter email"
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder:text-white/70 border border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] outline-none transition"
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
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder:text-white/70 border border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] outline-none transition"
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
          className="w-full py-3 rounded-lg bg-[#FFD700] hover:bg-white transition text-[#222D5C] font-bold text-base tracking-wide"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="mt-5 text-center">
          <span className="text-white text-sm">Forgot your password?</span>
          <a href="#" className="ml-2 text-[#FFD700] hover:underline text-sm">Reset</a>
        </div>
      </form>
    </div>
  );
}
