// import { useParams } from "next/navigation";

// const { token } = useParams(); // token is whatever is in the URL

// Generate a random token in JS
// function generateToken(length = 20) {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let token = "";
//   for (let i = 0; i < length; i++) {
//     token += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return token;
// }

// // Example usage
// const token = generateToken();
// console.log("Simulated reset token:", token);

'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const { token } = useParams(); // get the token from URL
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate reset success
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Password has been successfully reset!");
      setPassword("");
      setConfirmPassword("");

      // Optional: redirect to login page after 2s
      setTimeout(() => router.push("/login"), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[hsl(224,80%,2%)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-10 rounded-[12px] shadow-lg bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <p className="mb-4 text-sm text-white/70 text-center">
          Enter a new password to reset your account.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-[12px] bg-white bg-opacity-20 placeholder:text-white/70 mb-3 border border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] outline-none transition"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-[12px] bg-white bg-opacity-20 placeholder:text-white/70 mb-3 border border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] outline-none transition"
          required
        />

        {error && <p className="text-[#FFD700] text-sm mb-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mb-2">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-[12px] bg-[#FFD700] hover:bg-white transition text-[#222D5C] font-bold text-base tracking-wide"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
