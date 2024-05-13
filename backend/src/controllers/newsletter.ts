import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import Newsletter from "src/models/newsletter";
import validationErrorParser from "src/util/validationErrorParser";

export const getAllNewsletters: RequestHandler = async (req, res, next) => {
  try {
    const newsletters = await Newsletter.find({});

    if (!newsletters) {
      res.status(200).json({ message: "No newsletters found." });
    }

    res.status(200).json(newsletters);
  } catch (error) {
    next(error);
  }
};

export const getNewsletter: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const newsletter = await Newsletter.findById(id);

    if (!newsletter) {
      throw createHttpError(404, "Newsletter not found.");
    }

    res.status(200).json(newsletter);
  } catch (error) {
    next(error);
  }
};

export const createNewsletter: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { image, title, description, date, content } = req.body;

  try {
    validationErrorParser(errors);

    const newsletter = await Newsletter.create({
      image,
      title,
      description,
      date,
      content,
    });

    console.log("newsletter: ", newsletter);
    res.status(201).json(newsletter);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    next(error);
  }
};

export const updateNewsletter: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (id !== req.body._id) {
    // If the _id in the URL does not match the _id in the body, bad request
    res.status(400);
  }

  try {
    validationErrorParser(errors);

    const newsletter = await Newsletter.findByIdAndUpdate(id, req.body);
    if (newsletter === null) {
      // No newsletter found
      res.status(404);
    }
    const updatedNewsletter = await Newsletter.findById(id);
    if (updatedNewsletter === null) {
      // No newsletter found, something went wrong
      res.status(404);
    }
    res.status(200).json(updatedNewsletter);
  } catch (error) {
    next(error);
  }
};

export const deleteNewsletter: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const newsletter = await Newsletter.findByIdAndDelete(id);

    if (!newsletter) {
      throw createHttpError(404, "Newsletter not found.");
    }

    res.status(200).json(newsletter);
  } catch (error) {
    next(error);
  }
};
