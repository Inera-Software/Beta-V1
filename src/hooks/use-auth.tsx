
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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
  knownAccounts: User[];
  signIn: (email: string, password: string) => Promise<void>;
  signOut: (isAddingAccount?: boolean) => void;
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
  const [knownAccounts, setKnownAccounts] = useLocalStorage<User[]>('knownAccounts', []);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const updateUserFromToken = useCallback((currentToken: string | null) => {
    if (!currentToken) {
        if (user !== null) setUser(null);
        return;
    }
    try {
        const decoded = jwtDecode<DecodedToken>(currentToken);
        if (decoded.exp * 1000 > Date.now()) {
            const userData = { id: decoded.id, email: decoded.email, username: decoded.username };
            if (user?.id !== userData.id) {
                setUser(userData);
            }
        } else {
            if (user !== null) setUser(null);
            if (token !== null) setToken(null);
        }
    } catch (error) {
        console.error("Invalid token:", error);
        if (user !== null) setUser(null);
        if (token !== null) setToken(null);
    }
  }, [user, token, setToken]);


  useEffect(() => {
    updateUserFromToken(token);
    setLoading(false);
  }, [token, updateUserFromToken]);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname.startsWith('/user/login') || pathname.startsWith('/user/signup');
    const isPublicPage = isAuthPage || pathname.startsWith('/user/forgot-password') || pathname.startsWith('/user/reset-password') || pathname === '/';
    
    if (user && isAuthPage && !pathname.includes('switch=true')) {
        router.push('/dashboard');
    } else if (!user && !isPublicPage) {
        router.push('/user/login');
    }
  }, [user, loading, pathname, router]);

  const addKnownAccount = (newUser: User) => {
    setKnownAccounts(prev => {
        if (prev.find(u => u.id === newUser.id)) {
            return prev;
        }
        return [...prev, newUser];
    })
  }

  const handleAuthSuccess = (newToken: string) => {
      setToken(newToken);
      const decoded = jwtDecode<DecodedToken>(newToken);
      const newUser = { id: decoded.id, email: decoded.email, username: decoded.username };
      setUser(newUser);
      addKnownAccount(newUser);
  }

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
      handleAuthSuccess(data.token);
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
        handleAuthSuccess(data.token);
      } else {
        throw new Error(data.error || 'Registration failed.');
      }
  }

  const signOut = (isAddingAccount = false) => {
    setUser(null);
    setToken(null);
    const destination = isAddingAccount ? '/user/signup' : '/user/login';
    router.push(destination);
  };

  const value = { user, knownAccounts, signIn, signOut, signUp, loading };

  return (
    <AuthContext.Provider value={value}>
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
