import { body } from "express-validator";

const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
const makeCardValidator = () =>
  body("card")
    .exists()
    .withMessage("card is required")
    .bail()
    .isString()
    .withMessage("card must be a string")
    .bail()
    .notEmpty()
    .withMessage("card cannot be empty");
const makeDateValidator = () =>
  body("date")
    .exists()
    .withMessage("date is required")
    .bail()
    .isString()
    .withMessage("date must be a string")
    .bail()
    .notEmpty()
    .withMessage("date cannot be empty");

export const updateRecord = [makeIDValidator(), makeCardValidator(), makeDateValidator()];
