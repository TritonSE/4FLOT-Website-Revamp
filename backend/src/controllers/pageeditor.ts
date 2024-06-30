import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import PageEditor from "src/models/pageeditor";
import validationErrorParser from "src/util/validationErrorParser";

export const getPage: RequestHandler = async (req, res, next) => {
  const { name } = req.params;

  try {
    const page = await PageEditor.findOne({ name: name });

    if (!page) {
      throw createHttpError(404, "Page not found.");
    }

    res.status(200).json(page);
  } catch (error) {
    next(error);
  }
};

export const updatePageEditor: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { name } = req.params;
  if (name !== req.body.name) {
    // If the page in the URL does not match the page in the body, bad request
    res.status(400);
  }

  try {
    validationErrorParser(errors);
    const page = await PageEditor.findOneAndUpdate({ name: name }, { $set: req.body });
    if (page === null) {
      // No page found
      res.status(404);
    }
    const updatedPage = await PageEditor.findOne({ name: name });
    if (updatedPage === null) {
      // No page found after updating, something went wrong
      res.status(404);
    }
    res.status(200).json(updatedPage);
  } catch (error) {
    next(error);
  }
};
