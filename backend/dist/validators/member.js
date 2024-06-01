"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.createMember = void 0;
const express_validator_1 = require("express-validator");
const makeIDValidator = () => (0, express_validator_1.body)("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
const makeNameValidator = () => (0, express_validator_1.body)("name")
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
const makeRoleValidator = () => (0, express_validator_1.body)("role")
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
const makeProfilePictureURLValidator = () => (0, express_validator_1.body)("profilePictureURL").optional().isString().withMessage("profilePictureURL must be a string");
exports.createMember = [
    makeNameValidator(),
    makeRoleValidator(),
    makeProfilePictureURLValidator(),
];
exports.updateTask = [
    makeIDValidator(),
    makeNameValidator(),
    makeRoleValidator(),
    makeProfilePictureURLValidator(),
];
