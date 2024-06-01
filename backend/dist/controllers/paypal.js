"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureOrderHandler = exports.createOrderHandler = void 0;
const paypal_1 = require("src/services/paypal");
const createOrderHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cart } = req.body;
        const { jsonResponse, httpStatusCode } = yield (0, paypal_1.createOrder)(cart);
        res.status(httpStatusCode).json(jsonResponse);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderHandler = createOrderHandler;
const captureOrderHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { jsonResponse, httpStatusCode } = yield (0, paypal_1.captureOrder)(orderId);
        res.status(httpStatusCode).json(jsonResponse);
    }
    catch (error) {
        next(error);
    }
});
exports.captureOrderHandler = captureOrderHandler;
