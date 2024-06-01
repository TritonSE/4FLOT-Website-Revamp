"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paypal_1 = require("../controllers/paypal");
const router = express_1.default.Router();
router.post("/", paypal_1.createOrderHandler);
router.post("/:orderId/capture", paypal_1.captureOrderHandler);
exports.default = router;
