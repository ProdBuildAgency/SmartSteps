import express from 'express';
import { getUser, updateUser } from '../Controllers/user.controller';
const router = express.Router();

router.get('/:id', getUser);
router.patch('/:id', updateUser);

export default router;
