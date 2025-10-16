import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import categoryRoutes from './category.routes';
import tagRoutes from './tag.routes';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/category', categoryRoutes)
router.use('/tag', tagRoutes)

export default router;
