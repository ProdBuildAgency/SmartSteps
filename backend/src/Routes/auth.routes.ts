import { Router } from 'express';
import { AuthController } from '../Controllers';

const router = Router();
router.post('/login', AuthController.login);
router.post("/register", AuthController.register);
router.post("/resetpassword", AuthController.resetPassword)

export default router;