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

export const createSubscriber = [makeEmailValidator()];
