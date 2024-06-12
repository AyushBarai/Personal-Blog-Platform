import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="p-4 bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">Home</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, User </span>
              <button onClick={logout} className="mr-4">Logout</button>
              <Link href="/dashboard">Dashboard</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
