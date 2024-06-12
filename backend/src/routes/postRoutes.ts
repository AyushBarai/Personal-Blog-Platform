import { Router } from 'express';
import { createPost, getPosts, getdash, userinfo } from '../controllers/postController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/post', authMiddleware, createPost);
router.get('/posts', getPosts);
router.get('/dash', authMiddleware, getdash);
router.get('/user', authMiddleware, userinfo);


export default router;
