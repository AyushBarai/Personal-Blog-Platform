import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getPosts, getSearchPosts } from '../utils/api';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from 'react';

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (search.trim()) {
      router.push(`/?author=${search}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div>
      <Head>
        <title>Personal Blog Platform</title>
      </Head>
      <header className="flex items-end justify-end px-4 py-4 shadow-md">
        <form className="flex items-center gap-2" onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md w-auto"
          />
          <Button type="submit" variant="outline" size="icon">
            <SearchIcon className="w-5 h-5" />
          </Button>
        </form>
      </header>
      <h1 className="text-3xl font-bold text-center py-4">Personal Blog Posts</h1>
      <main className="container mx-auto p-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { author } = context.query;

  try {
    const response = author ? await getSearchPosts(author as string) : await getPosts();
    return {
      props: {
        posts: response.data,
      },
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default Home;

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
