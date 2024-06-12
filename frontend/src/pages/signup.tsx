import { useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '../utils/api';
import Header from '../components/Header';
import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, username, password);
      router.push('/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div>
      <main className="container mx-auto p-4">
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Signup</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to create your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)}  required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)}  required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have a account{" "}
          <Link href="/login" className="underline" prefetch={false}>
            Login
          </Link>
        </div>
      </div>
    </div>
      </main>
    </div>
  );
};

export default Signup;
