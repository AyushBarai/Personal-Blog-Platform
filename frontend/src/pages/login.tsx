import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { login } from '../utils/api';
import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      loginUser(response.data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container mx-auto p-4 z-10 min-h-[100dvh]">
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account.</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline" prefetch={false}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
