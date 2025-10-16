import { Router } from "express";
import { ProductController } from "../Controllers";
import { AuthMiddleWare } from "../Middlewares";

const router = Router();

router.get("", AuthMiddleWare.verifyToken, ProductController.getAll);
router.get("/:id", AuthMiddleWare.verifyToken, ProductController.get);
router.post("", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, ProductController.create);
router.put("/:id", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, ProductController.update);
router.patch("/:id", AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, ProductController.updateStatus)

export default router;
