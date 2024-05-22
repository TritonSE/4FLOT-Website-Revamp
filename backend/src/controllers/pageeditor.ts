import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import PageEditor from "src/models/pageeditor";
import validationErrorParser from "src/util/validationErrorParser";

export const getPage: RequestHandler = async (req, res, next) => {
  const { page } = req.params;

  try {
    const pageText = await PageEditor.findOne({ page: page });

    if (!pageText) {
      throw createHttpError(404, "Page not found.");
    }

    res.status(200).json(pageText);
  } catch (error) {
    next(error);
  }
};

export const updatePageEditor: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { page } = req.params;

  if (page !== req.body.page) {
    // If the page in the URL does not match the page in the body, bad request
    res.status(400);
  }

  try {
    validationErrorParser(errors);

    const pageText = await PageEditor.findOneAndUpdate({ page }, req.body);
    if (pageText === null) {
      // No page found
      res.status(404);
    }
    const updatedPage = await PageEditor.findOne({ page });
    if (updatedPage === null) {
      // No page found after updating, something went wrong
      res.status(404);
    }
    res.status(200).json(updatedPage);
  } catch (error) {
    next(error);
  }
};
