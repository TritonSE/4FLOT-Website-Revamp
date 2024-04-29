/*
 * Controller for the newsletter subscriber route, /api/subscribers.
 * passes error handling off to /src/util/validationErrorParser.ts
 */

import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Subscriber from "src/models/subscriber";
import validationErrorParser from "src/util/validationErrorParser";
import createHttpError from "http-errors";

export const createSubscriber: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { email } = req.body;

  let memSince;
  if (req.body.memberSince) {
    memSince = req.body.memberSince;
  } else {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    memSince = `${year}-${month}-${day}`;
  }

  try {
    validationErrorParser(errors);
    const subscriber = await Subscriber.create({
      email: email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      memberSince: memSince,
      quarterlyUpdates: req.body.quarterlyUpdates,
      specialUpdates: req.body.specialUpdates,
    });

    res.status(201).json(subscriber);
  } catch (error) {
    next(error);
  }
};

export const getAllSubscribers: RequestHandler = async (req, res, next) => {
  try {
    const mailingListEntries = await Subscriber.find({});

    if (!mailingListEntries || mailingListEntries.length === 0) {
      return res.status(200).json({ message: "No mailing list entries found." });
    }

    // const formattedMailingList = mailingListEntries.map((entry) => {
    //   if (!entry.firstName) {
    //     entry.firstName = "";
    //   }
    //   if (!entry.lastName) {
    //     entry.lastName = "";
    //   }
    // });

    res.status(200).json(mailingListEntries);
  } catch (error) {
    next(error);
  }
};

export const deleteSubscriber: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const subscriber = await Subscriber.findByIdAndDelete(id);

    if (!subscriber) {
      throw createHttpError(404, "Subscriber not found.");
    }

    res.status(200).json(subscriber);
  } catch (error) {
    next(error);
  }
};
