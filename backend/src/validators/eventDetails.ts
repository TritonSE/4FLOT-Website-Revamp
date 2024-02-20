import { body } from "express-validator";

const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string");
const makeDescriptionValidator = () =>
  body("description")
    .exists()
    .withMessage("description is required")
    .bail()
    .isString()
    .withMessage("description must be a string");
const makeGuidlinesValidator = () =>
  body("guidlines")
    .exists()
    .withMessage("guidlines is required")
    .bail()
    .isString()
    .withMessage("guidlines must be a string");
const makeDateValidator = () =>
  body("date")
    .exists()
    .withMessage("date is required")
    .bail()
    .isDate()
    .withMessage("date must be a date");
const makeLocationValidator = () =>
  body("location")
    .exists()
    .withMessage("location is required")
    .bail()
    .isString()
    .withMessage("location must be a string");

export const createEventDetails = [
  makeNameValidator(),
  makeDescriptionValidator(),
  makeGuidlinesValidator(),
  makeDateValidator(),
  makeLocationValidator(),
];

export const getTask = [makeIDValidator()];
