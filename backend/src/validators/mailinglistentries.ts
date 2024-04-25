import { body } from "express-validator";

const makeIDValidator = () =>
  body("id")
    .exists()
    .withMessage("ID is required")
    .bail()
    .isNumeric()
    .withMessage("ID must be a number");

const makeLastNameValidator = () =>
  body("lastName")
    .exists()
    .withMessage("Last name is required")
    .bail()
    .isString()
    .withMessage("Last name must be a string");

const makeFirstNameValidator = () =>
  body("firstName")
    .exists()
    .withMessage("First name is required")
    .bail()
    .isString()
    .withMessage("First name must be a string");

const makeMemberSinceValidator = () =>
  body("memberSince")
    .exists()
    .withMessage("Member since date is required")
    .bail()
    .isISO8601()
    .toDate()
    .withMessage("Member since date must be in ISO 8601 format");

const makeEmailValidator = () =>
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email must be a valid email address");

export const createMailingListEntryValidator = [
  makeIDValidator(),
  makeLastNameValidator(),
  makeFirstNameValidator(),
  makeMemberSinceValidator(),
  makeEmailValidator(),
];

export const getMailingListEntryValidator = [makeIDValidator()];
