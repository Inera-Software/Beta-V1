
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from './use-local-storage';

const API_URL = "/api/auth";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (username: string, email: string, password: string, confirm: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DecodedToken {
    id: string;
    email: string;
    username: string;
    exp: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage<string | null>('authToken', null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    try {
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.id, email: decoded.email, username: decoded.username });
        } else {
          // Token expired
          setUser(null);
          setToken(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setUser(null);
      setToken(null);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (!loading) {
        const isAuthPage = pathname.startsWith('/user/login') || pathname.startsWith('/user/signup') || pathname.startsWith('/user/forgot-password') || pathname.startsWith('/user/reset-password');
        const isPublicPage = isAuthPage || pathname === '/';
        
        if (user && isAuthPage) {
            router.push('/dashboard');
        } else if (!user && !isPublicPage) {
            router.push('/user/login');
        }
    }
  }, [user, loading, pathname, router]);

  const signIn = async (email: string, password: string) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email: email,
        password: password
      })
    });
    const data = await response.json();
    if (response.ok) {
      setToken(data.token);
      const decoded = jwtDecode<DecodedToken>(data.token);
      setUser({ id: decoded.id, email: decoded.email, username: decoded.username });
    } else {
      throw new Error(data.error || "Login failed.");
    }
  };

  const signUp = async (username: string, email: string, password: string, confirmPassword: string) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "register",
          UserName: username,
          Email: email,
          Password: password,
          ConfirmPassword: confirmPassword
        }),
      });
      const data = await res.json();
      if(res.ok) {
        setToken(data.token);
        const decoded = jwtDecode<DecodedToken>(data.token);
        setUser({ id: decoded.id, email: decoded.email, username: decoded.username });
      } else {
        throw new Error(data.error || 'Registration failed.');
      }
  }

  const signOut = () => {
    setUser(null);
    setToken(null);
    router.push('/user/login');
  };

  const value = { user, signIn, signOut, signUp, loading };

  return (
    <AuthContext.Provider value={value}>
        {/* We don't show a loading spinner for the whole app, just manage state */}
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
