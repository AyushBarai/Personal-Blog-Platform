import axios from 'axios';
import { getEmailFromToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});
export const signup = (email: string, username: string, password: string) =>
  api.post('/auth/signup', { email, username, password });

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const createPost = (title: string, content: string, token: string) =>
  api.post('/post', { title, content }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPosts = () => api.get('/posts');

export const getPostsByAuthor = (author: string) => api.get(`/posts?author=${author}`);


export const getPostsByEmail = () => {
  const email = getEmailFromToken();
  if (!email) {
    throw new Error('Email not found in token');
  }

  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/dash`, {
    params: { email },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSearchPosts = (author: string) => {
  return axios.get(`${API_URL}/posts?author=${author}`);
};

export const getUserDetails = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
