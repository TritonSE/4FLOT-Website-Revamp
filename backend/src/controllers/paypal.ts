import { RequestHandler } from "express";
import { captureOrder, createOrder } from "src/services/paypal";

export const createOrderHandler: RequestHandler = async (req, res, next) => {
  try {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    next(error);
  }
};

export const captureOrderHandler: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderId);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    next(error);
  }
};
