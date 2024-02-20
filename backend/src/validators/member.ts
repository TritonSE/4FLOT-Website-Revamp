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
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("name is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty");
const makeRoleValidator = () =>
  body("role")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("role is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("role must be a string")
    .bail()
    .notEmpty()
    .withMessage("role cannot be empty");
const makeProfilePictureURLValidator = () =>
  body("profilePictureURL").optional().isString().withMessage("profilePictureURL must be a string");

export const createMember = [
  makeNameValidator(),
  makeRoleValidator(),
  makeProfilePictureURLValidator(),
];

export const updateTask = [
  makeIDValidator(),
  makeNameValidator(),
  makeRoleValidator(),
  makeProfilePictureURLValidator(),
];
