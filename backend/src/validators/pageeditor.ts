import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string");

const makeEditedValidator = () =>
  body("isEdited")
    .exists()
    .withMessage("isEdited is required")
    .bail()
    .isBoolean()
    .withMessage("isEdited must be a boolean");

const makeFieldsValidator = () =>
  body("fields")
    .exists()
    .withMessage("fields is required")
    .bail()
    .isArray()
    .withMessage("fields must be an array");

export const getPageEditor = [makeNameValidator(), makeEditedValidator(), makeFieldsValidator()];
export const updatePageEditor = [makeNameValidator(), makeEditedValidator(), makeFieldsValidator()];
