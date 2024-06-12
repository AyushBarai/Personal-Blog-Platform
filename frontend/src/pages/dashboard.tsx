import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createPost, getPostsByAuthor, getPostsByEmail } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('User:', user);
    if (user) {
      getPostsByEmail()
        .then(response => setPosts(response.data))
        .catch(error => console.error('Failed to fetch posts', error));
    } else {
      router.push('/login');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await createPost(title, content, user.token);
        setTitle('');
        setContent('');
        const response = await getPostsByEmail()
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div>
      <main className="container mx-auto p-4">
        <div onSubmit={handleSubmit} className="">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold py-4">Dashboard</h1>
          </div>
          <form className="space-y-4">
            <div className="flex gap-2">
              <Label htmlFor="text" className='justify-between items-center text-2xl'>Title:</Label>
              <Input id="text" type="text" placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </div>
            <div className="flex gap-2">
              <Label htmlFor="text" className='justify-between items-center text-2xl'>Content:</Label>
              <Input id="text" type="text" value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">
              Create Post
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-8">Your Posts</h2>
        {posts.map(post => (
          <PostCard post={post} />
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
