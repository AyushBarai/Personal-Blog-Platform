import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserFromToken = (): User | null => {
  const token = getToken();
  if (token) {
    const decoded: any = jwtDecode(token);
    return {
      id: decoded.userId,
      username: decoded.username,
      email: decoded.email,
    };
  }
  return null;
};

export const getEmailFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return null;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.email;
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
};
