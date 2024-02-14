/*
 * Controller for the newsletter subscriber route, /api/subscribers.
 * passes error handling off to /src/util/validationErrorParser.ts
 */

import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Subscriber from "src/models/subscriber";
import validationErrorParser from "src/util/validationErrorParser";

export const createSubscriber: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { email } = req.body;

  try {
    // validationErrorParser is a helper that throws 400 if there are errors
    validationErrorParser(errors);
    const subscriber = await Subscriber.create({
      email: email,
    });

    /*
     * TODO: Handle adding the newsletter subscriber
     * to a mailing list or however this will be handled.
     */

    // successfully created subscriber in db
    res.status(201).json(subscriber);
  } catch (error) {
    next(error);
  }
};
