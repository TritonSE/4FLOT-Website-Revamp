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
const makeContentValidator = () =>
  body("content")
    .exists()
    .withMessage("content is required")
    .bail()
    .isString()
    .withMessage("content must be a string");
const makeGuidlinesValidator = () =>
  body("guidelines")
    .exists()
    .withMessage("guidelines is required")
    .bail()
    .isString()
    .withMessage("guidelines must be a string");
const makeDateValidator = () =>
  body("date")
    .exists()
    .withMessage("date is required")
    .bail()
    .isString()
    .withMessage("date must be a string");
const makeLocationValidator = () =>
  body("location")
    .exists()
    .withMessage("location is required")
    .bail()
    .isString()
    .withMessage("location must be a string");
const makeImageURIValidator = () =>
  body("imageURI")
    .exists()
    .withMessage("imageURI is required")
    .bail()
    .isString()
    .withMessage("imageURI must be a string")
    .bail()
    .isURL()
    .withMessage("imageURI must be a URL");

export const createEventDetails = [
  makeNameValidator(),
  makeDescriptionValidator(),
  makeContentValidator(),
  makeGuidlinesValidator(),
  makeDateValidator(),
  makeLocationValidator(),
  makeImageURIValidator(),
];

export const getEventDetails = [makeIDValidator()];
