import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const signup = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  
  // Check if the username or email already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Email or username already exists' });
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ email, username, passwordHash });
  await user.save();
  res.status(201).json({ message: 'User created' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );  res.json({ token });
};
