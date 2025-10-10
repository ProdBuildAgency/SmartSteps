import { Router } from 'express';
import { AuthController } from '../Controllers';

const router = Router();
router.post('/login', AuthController.login);

export default router;