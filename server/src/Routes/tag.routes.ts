import express from 'express';
import { TagController } from '../Controllers';
import { AuthMiddleWare } from '../Middlewares';

const router = express.Router();

router.post("", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, TagController.create);
router.get("", TagController.getAll);
router.get("/:id", TagController.get);
router.put("/:id", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, TagController.update)
router.patch("/:id", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, TagController.updateStatus)

export default router;