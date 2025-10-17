
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, knownAccounts } = useAuth();

  const isSwitching = searchParams.get('switch') === 'true';
  const emailParam = searchParams.get('email');
  const switchingAccount = isSwitching && emailParam ? knownAccounts.find(acc => acc.email === emailParam) : null;
  
  useEffect(() => {
      if (isSwitching) {
        if (switchingAccount) {
            setUser(u => ({...u, email: switchingAccount.email}));
        } else {
          // If switch=true but account not found (e.g. cleared from local storage), 
          // redirect to regular login to avoid a broken state.
          router.replace('/user/login');
        }
      }
  }, [switchingAccount, isSwitching, router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;
    let newError = { email: "", password: "", server: "" };

    if (!user.email) {
      newError.email = "Please enter your email or username.";
      hasError = true;
    }
    if (!user.password) {
      newError.password = "Please enter your password.";
      hasError = true;
    }
    
    setError(newError);
    if (hasError) return;

    setLoading(true);
    setError({ email: "", password: "", server: "" });

    try {
      await signIn(user.email, user.password);
      router.push("/dashboard");
    } catch (err: any) {
      setError((prev) => ({ ...prev, server: err.message || "An unknown error occurred." }));
    } finally {
      setLoading(false);
    }
  }

  if (switchingAccount) {
      return (
        <div className="min-h-screen flex justify-center items-center bg-background font-sans p-4">
            <form className="w-full max-w-md px-8 py-10 rounded-2xl shadow-2xl bg-card/80 backdrop-blur-lg border border-primary/20" onSubmit={handleSubmit} noValidate>
                 <div className="flex flex-col items-center mb-6">
                    <h1 className="text-white text-xl font-medium mb-2">Welcome back</h1>
                    <div className="flex items-center gap-2 border border-input rounded-full p-1 pr-4">
                        <span className="text-sm text-gray-300">{switchingAccount.email}</span>
                    </div>
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoFocus
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 rounded-lg bg-background/50 text-white placeholder:text-gray-500 border border-input focus:ring-2 focus:ring-primary outline-none transition duration-300"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                     {error.password && <p className="text-red-400 mt-2 text-xs">{error.password}</p>}
                </div>
                {error.server && <div className="mb-4 text-center text-red-400 text-sm p-2 bg-red-900/20 rounded-md">{error.server}</div>}
                 <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-bold text-base tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {loading ? "Signing in..." : "Next"}
                </button>
                 <div className="mt-6 text-center text-sm">
                    <Link href="/user/login" className="text-primary hover:underline font-medium">
                        Use another account
                    </Link>
                </div>
            </form>
        </div>
      )
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-background font-sans p-4">
      <form
        className="w-full max-w-md px-8 py-10 rounded-2xl shadow-2xl bg-card/80 backdrop-blur-lg border border-primary/20"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="mb-4 animate-pulse"
            priority
          />
          <h1
            className="inline-block text-3xl font-extrabold tracking-widest text-primary"
          >
            Quick IS
          </h1>
          <h2 className="mt-4 text-white text-xl font-medium">
            Login to your account
          </h2>
        </div>
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="email">Email or Username</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            placeholder="e.g., user@example.com"
            className="w-full px-4 py-3 rounded-lg bg-background/50 text-white placeholder:text-gray-500 border border-input focus:ring-2 focus:ring-primary outline-none transition duration-300"
            value={user.email}
            onChange={handleChange}
            required
          />
          {error.email && <p className="text-red-400 mt-2 text-xs">{error.email}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg bg-background/50 text-white placeholder:text-gray-500 border border-input focus:ring-2 focus:ring-primary outline-none transition duration-300"
            value={user.password}
            onChange={handleChange}
            required
          />
          {error.password && <p className="text-red-400 mt-2 text-xs">{error.password}</p>}
        </div>

        {error.server && <div className="mb-4 text-center text-red-400 text-sm p-2 bg-red-900/20 rounded-md">{error.server}</div>}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-bold text-base tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Forgot your password?</span>
          <Link href="/user/forgot-password" className="ml-1.5 text-primary hover:underline font-medium">Reset it</Link>
        </div>
        <div className="mt-3 text-center text-sm">
          <span className="text-gray-400">Don't have an account?</span>
          <Link
            href="/user/signup"
            className="ml-1.5 text-primary hover:underline font-medium"
          >
            Sign up now
          </Link>
        </div>
      </form>
    </div>
  );
}
