import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUserId } from '../types/types'; // Import the interface

export const authMiddleware = (req: RequestWithUserId, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
