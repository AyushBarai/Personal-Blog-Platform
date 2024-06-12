# Personal Blog Platform
This project is a personal blog platform where users can sign up, log in, and post articles. It provides a backend built with Node.js and Express and a frontend using Next.js 14 with TypeScript.

## Features
User authentication: Users can sign up, log in, and access their dashboard.
Posting articles: Authenticated users can create and publish articles.
Viewing posts: All users can view all posts or filter them by author.
Responsive design: The UI is designed to be responsive and user-friendly.

## Technologies Used

### Backend
Node.js
Express
MongoDB (with Mongoose for object modeling)
JWT for authentication

### Frontend
Next.js 14
TypeScript
Tailwind CSS for styling

## Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/personal-blog-platform.git
Install dependencies:

bash
Copy code
cd personal-blog-platform
cd backend && npm install
cd ../frontend && npm install
Set up environment variables:

Create a .env file in the backend directory and add your MongoDB connection string and JWT secret.

Example .env file:

plaintext
Copy code
MONGODB_URI=mongodb://localhost:27017/personal-blog
JWT_SECRET=yoursecretkey
Start the backend server:

bash
Copy code
cd ../backend && npm run dev
Start the frontend server:

bash
Copy code
cd ../frontend && npm run dev
Access the application at http://localhost:3000.

API Endpoints
POST /signup: Registers a new user with email and password.
POST /login: Authenticates a user and returns a session token.
POST /post: Allows authenticated users to post a new article.
GET /posts: Retrieves all posts.
GET /posts?author=userId: Retrieves posts by a specific author.
