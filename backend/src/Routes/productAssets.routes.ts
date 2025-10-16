import { Router } from "express";
import { ProductAssetsController } from "../Controllers";

const router = Router();

router.post('', ProductAssetsController.upload);
router.get('', ProductAssetsController.get);
router.patch('/:id', ProductAssetsController.changeStatus);
router.delete('/:id', ProductAssetsController.delete);

export default router;
