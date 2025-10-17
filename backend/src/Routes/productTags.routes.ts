import { Router } from "express";
import { ProductTagsController } from "../Controllers";
import { AuthMiddleWare } from "../Middlewares";

const router = Router({ mergeParams: true });

router.post('', AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, ProductTagsController.link);
router.delete('/:tag_id', AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin, ProductTagsController.unlink);

export default router;
