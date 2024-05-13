import express from "express";
import { captureOrderHandler, createOrderHandler } from "src/controllers/paypal";

const router = express.Router();

router.post("/", createOrderHandler);
router.post("/:orderId/capture", captureOrderHandler);

export default router;
