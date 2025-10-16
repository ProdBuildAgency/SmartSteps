import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import categoryRoutes from './category.routes';
import tagRoutes from './tag.routes';
import productRoutes from './product.routes'
import productAssetsRoutes from './product.routes'
import productTagsRoutes from './product.routes'

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/category', categoryRoutes);
router.use('/tag', tagRoutes);
router.use('/products', productRoutes);
router.use('/products/:id/assets', productAssetsRoutes);
router.use('/products/:id/tags', productTagsRoutes);

export default router;
