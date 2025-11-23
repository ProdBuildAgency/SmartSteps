import express from 'express';
import { CategoryController } from '../Controllers';
import { AuthMiddleWare } from '../Middlewares';

const router = express.Router();

router.post("", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, CategoryController.create);
router.get("", CategoryController.getAll);
router.get("/:id", CategoryController.get);
router.put("/:id", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, CategoryController.update);
router.patch("/:id", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, CategoryController.updateStatus);

export default router;