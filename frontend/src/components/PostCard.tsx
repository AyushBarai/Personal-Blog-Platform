import { Post } from '../types';
import React from 'react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.content}</p>
      <p className="text-sm text-gray-600">
        By on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostCard;
