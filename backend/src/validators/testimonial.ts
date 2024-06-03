import { body } from "express-validator";

const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isString()
    .withMessage("_id must be a MongoDB object ID");

const makeTitleValidator = () =>
  body("title")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("title is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("title must be a string")
    .bail()
    .notEmpty()
    .withMessage("title cannot be empty");
const makeDescriptionValidator = () =>
  body("description")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("description is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("description must be a string")
    .bail()
    .notEmpty()
    .withMessage("description cannot be empty");

const makeImageValidator = () =>
  body("image")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("image is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("image must be a string")
    .bail()
    .notEmpty()
    .withMessage("image cannot be empty");

export const createTestimonial = [
  makeTitleValidator(),
  makeImageValidator(),
  makeDescriptionValidator(),
];

export const updateTestimonial = [makeIDValidator(), makeImageValidator()];

export const deleteTestimonial = [makeIDValidator()];
