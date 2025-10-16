'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    // Simulate API call and then navigate as if the link was clicked
    setTimeout(() => {
      router.push('/reset-password/demo-token');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[hsl(224,80%,2%)] z-[9999]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-10 rounded-[12px] shadow-lg bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        <p className="mb-4 text-sm text-white/70">
          Enter your email to receive a password reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-[12px] bg-white bg-opacity-20 placeholder:text-white/70 mb-3 border border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] outline-none transition"
          required
        />

        {error && <p className="text-[#FFD700] text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-[12px] bg-[#FFD700] hover:bg-white transition text-[#222D5C] font-bold text-base tracking-wide"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
