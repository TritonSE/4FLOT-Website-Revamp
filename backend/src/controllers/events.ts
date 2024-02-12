import { RequestHandler } from "express";
import eventModel from "src/models/events";

export const createEvent: RequestHandler = async (req, res, next) => {
  const { title, description, image } = req.body;
  try {
    const event = await eventModel.create({
      title: title,
      description: description,
      image: image,
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventModel.find({});
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
