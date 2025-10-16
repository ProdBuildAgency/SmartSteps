import { Router } from "express";
import { ProductAssetsController } from "../Controllers";

const router = Router();

router.post('', ProductAssetsController.link);
router.delete('/:id', ProductAssetsController.unlink);

export default router;
