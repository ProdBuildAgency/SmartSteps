import express from "express";
import { OrderController } from "../Controllers";
import { AuthMiddleWare } from "../Middlewares";

const router = express.Router();

router.post("", AuthMiddleWare.verifyToken,OrderController.create);

router.get("", AuthMiddleWare.verifyToken, OrderController.getAll);

router.get("/:id", AuthMiddleWare.verifyToken, OrderController.get);

router.patch("/:id/status",AuthMiddleWare.verifyToken,OrderController.updateStatus);

export default router;
