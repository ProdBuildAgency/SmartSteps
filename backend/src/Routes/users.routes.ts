import express from 'express';
import { UserController } from '../Controllers'
import { AuthMiddleWare } from '../Middlewares';

const router = express.Router();

router.get('/:id', UserController.getUser);
router.patch('/:id', UserController.updateUser);
router.get('', AuthMiddleWare.verifyToken, UserController.authorize);

export default router;
