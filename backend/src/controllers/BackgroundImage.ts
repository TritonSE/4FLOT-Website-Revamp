import { RequestHandler } from "express";
import BackgroundImageModel from "src/models/BackgroundImage";

export const getBackgroundImages: RequestHandler = async (req, res, next) => {
  const { page } = req.query;
  try {
    const images = await BackgroundImageModel.find({ page });
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};
