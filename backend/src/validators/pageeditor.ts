import { body } from "express-validator";

const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isString()
    .withMessage("_id must be a number");
const makePageValidator = () =>
  body("page")
    .exists()
    .withMessage("image is required")
    .bail()
    .isString()
    .withMessage("image must be a string");
const makeSubtitleValidator = () =>
  body("ph_subtitle")
    .exists()
    .withMessage("subtitle is required")
    .bail()
    .isString()
    .withMessage("subtitle must be a string");
const makeTitleValidator = () =>
  body("s1_title")
    .exists()
    .withMessage("date is required")
    .bail()
    .isString()
    .withMessage("date must be a string");
const makeTextValidator = () =>
  body("s1_text")
    .exists()
    .withMessage("content is required")
    .bail()
    .isString()
    .withMessage("content must be a string");

export const getPageEditor = [makePageValidator()];

export const createPageEditor = [
  makeIDValidator(),
  makePageValidator(),
  makeSubtitleValidator(),
  makeTitleValidator(),
  makeTextValidator(),
];
