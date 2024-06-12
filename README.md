# Personal Blog Platform
This project is a personal blog platform where users can sign up, log in, and post articles. It provides a backend built with Node.js and Express and a frontend using Next.js 14 with TypeScript.

## Features
User authentication: Users can sign up, log in, and access their dashboard.
Posting articles: Authenticated users can create and publish articles.
Viewing posts: All users can view all posts or filter them by author.
Responsive design: The UI is designed to be responsive and user-friendly.

## Technologies Used

### Backend
* Node.js
* Express
* MongoDB (with Mongoose for object modeling)
* JWT for authentication

### Frontend
* Next.js 14
* TypeScript
* Tailwind CSS for styling

## Installation

1. Clone the repository:

``` bash
git clone [https://github.com/yourusername/personal-blog-platform.git](https://github.com/AyushBarai/Personal-Blog-Platform.git)
``` 

2. Install dependencies:

``` bash
cd personal-blog-platform
cd .\backend\
npm install
cd ..
cd .\frontend\ 
npm install
```

3. Set up environment variables:

For easy accessibility for the evaluator, .env file is already included and all the values are temp values randomly selected for this specific repo. But the .env file should not be included in the Git repo and will be deleted after a week or two.

4. Start the backend server:

``` bash
cd .\backend\
npm run dev
```
5. Start the frontend server:

``` bash
cd .\frontend\
npm run dev
``` 
6. Access the Frontend application at http://localhost:3000.

## API Endpoints
* POST /signup: Registers a new user with email and password.
* POST /login: Authenticates a user and returns a session token.
* POST /post: Allows authenticated users to post a new article.
* GET /posts: Retrieves all posts.
* GET /posts?author=userId: Retrieves posts by a specific author.
