import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { RequestWithUserId } from '../types/types'; // Import the interface

export const createPost = async (req: RequestWithUserId, res: Response) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, authorId: req.userId });
  await post.save();
  res.status(201).json({ message: 'Post created', post });
};

export const getPosts = async (req: Request, res: Response) => {
  const { author } = req.query;

  let query = {};
  if (author) {
    const user = await User.findOne({ username: author.toString() });
    if (user) {
      query = { authorId: user._id };
    } else {
      return res.status(404).json({ message: 'Author not found' });
    }
  }

  const posts = await Post.find(query).populate('authorId', 'username');
  res.json(posts);
};

export const getdash = async (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const user = await User.findOne({ email: email.toString() });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const posts = await Post.find({ authorId: user._id }).populate('authorId', 'username');
  res.json(posts);
};

export const userinfo = async (req: Request, res: Response) => {
  console.log("userinfo API callback");
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { username: string, email: string };
    const { username, email } = decoded;
    res.json({ username, email });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};