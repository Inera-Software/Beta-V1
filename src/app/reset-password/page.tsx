// app/reset-password/[token]/page.tsx
'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset-password",
          token,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Invalid or expired token.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[hsl(224,80%,2%)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-10 rounded-[12px] bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        {error && <p className="text-[#FFD700] text-sm mb-4">{error}</p>}
        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-[12px] bg-white bg-opacity-20 text-white placeholder:text-white/70 border border-[#FFD700]"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-[12px] bg-white bg-opacity-20 text-white placeholder:text-white/70 border border-[#FFD700]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-[12px] bg-[#FFD700] hover:bg-white transition text-[#222D5C] font-bold"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
