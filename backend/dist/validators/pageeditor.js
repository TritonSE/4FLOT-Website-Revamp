"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePageEditor = exports.getPageEditor = void 0;
const express_validator_1 = require("express-validator");
const makeNameValidator = () => (0, express_validator_1.body)("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string");
const makeEditedValidator = () => (0, express_validator_1.body)("isEdited")
    .exists()
    .withMessage("isEdited is required")
    .bail()
    .isBoolean()
    .withMessage("isEdited must be a boolean");
const makeFieldsValidator = () => (0, express_validator_1.body)("fields")
    .exists()
    .withMessage("fields is required")
    .bail()
    .isArray()
    .withMessage("fields must be an array");
exports.getPageEditor = [makeNameValidator(), makeEditedValidator(), makeFieldsValidator()];
exports.updatePageEditor = [makeNameValidator(), makeEditedValidator(), makeFieldsValidator()];
