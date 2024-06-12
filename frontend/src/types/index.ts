export interface Post {
    id: string;
    title: string;
    content: string;
    author: {
      username: string;
    };
    createdAt: string;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
  }
  