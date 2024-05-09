/*
 * Normalize and validate emails for newsletter subscribers
 * in the route handler.
 */

import { body } from "express-validator";
import Subscriber from "src/models/subscriber";

/*
 * 1. Trim whitespace then
 * 2. check if empty then
 * 3. check if valid email then
 * 4. normalize email then
 * 5. check if email already exists in db
 */

const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isString()
    .withMessage("_id must be a number");

const makeEmailValidator = () =>
  body("email")
    .trim()
    .exists()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email must be a valid email address")
    .bail()
    .normalizeEmail()
    .custom(async (value) => {
      // check if email already exists in db
      const subscriber = await Subscriber.findOne({ email: value }).exec();
      if (subscriber !== null) {
        return Promise.reject(`email is already subscribed`);
      }
    });

const makeFirstNameValidator = () =>
  body("firstName").optional().isString().withMessage("firstName must be a string");

const makeLastNameValidator = () =>
  body("lastName").optional().isString().withMessage("lastName must be a string");

const makeQuarterlyUpdatesValidator = () =>
  body("quarterlyUpdates").optional().isBoolean().withMessage("quarterlyUpdates must be a boolean");

const makeSpecialUpdatesValidator = () =>
  body("specialUpdates").optional().isBoolean().withMessage("specialUpdates must be a boolean");

export const createSubscriber = [
  makeEmailValidator(),
  makeFirstNameValidator(),
  makeLastNameValidator(),
  makeQuarterlyUpdatesValidator(),
  makeSpecialUpdatesValidator(),
];

export const deleteSubscriber = [makeIDValidator()];
