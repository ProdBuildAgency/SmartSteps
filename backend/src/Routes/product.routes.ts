import { Router } from "express";
import { ProductController } from "../Controllers";

const router = Router();

router.get("", ProductController.getAll);
router.get("/:id", ProductController.get);
router.post("", ProductController.create);
router.put("/:id", ProductController.update);
router.patch("/:id", ProductController.changeStatus)

export default router;
