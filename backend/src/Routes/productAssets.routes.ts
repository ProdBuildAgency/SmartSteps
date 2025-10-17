import { Router } from "express";
import { ProductAssetsController } from "../Controllers";
import { AuthMiddleWare } from "../Middlewares";
import multer from "multer";

const router = Router({ mergeParams: true });
const upload = multer({ storage: multer.memoryStorage() });

router.post('', AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin,  upload.array('assets'), ProductAssetsController.upload);
router.get('', AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin,ProductAssetsController.get);
router.patch('/:asset_id', AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin,ProductAssetsController.update);
router.delete('/:asset_id', AuthMiddleWare.verifyToken, AuthMiddleWare.verifyAdmin,ProductAssetsController.delete);

export default router;
