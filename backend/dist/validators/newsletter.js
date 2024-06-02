"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsletter = exports.getNewsletter = exports.updateNewsletter = exports.createNewsletter = void 0;
const express_validator_1 = require("express-validator");
const makeIDValidator = () => (0, express_validator_1.body)("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isString()
    .withMessage("_id must be a number");
const makeImageValidator = () => (0, express_validator_1.body)("image")
    .exists()
    .withMessage("image is required")
    .bail()
    .isString()
    .withMessage("image must be a string");
const makeTitleValidator = () => (0, express_validator_1.body)("title")
    .exists()
    .withMessage("title is required")
    .bail()
    .isString()
    .withMessage("title must be a string");
const makeDescriptionValidator = () => (0, express_validator_1.body)("description")
    .exists()
    .withMessage("description is required")
    .bail()
    .isString()
    .withMessage("description must be a string");
const makeDateValidator = () => (0, express_validator_1.body)("date")
    .exists()
    .withMessage("date is required")
    .bail()
    .isString()
    .withMessage("date must be a string");
const makeContentValidator = () => (0, express_validator_1.body)("content")
    .exists()
    .withMessage("content is required")
    .bail()
    .isString()
    .withMessage("content must be a string");
exports.createNewsletter = [
    makeImageValidator(),
    makeTitleValidator(),
    makeDescriptionValidator(),
    makeDateValidator(),
    makeContentValidator(),
];
exports.updateNewsletter = [
    makeIDValidator(),
    makeImageValidator(),
    makeTitleValidator(),
    makeDescriptionValidator(),
    makeDateValidator(),
    makeContentValidator(),
];
exports.getNewsletter = [makeIDValidator()];
exports.deleteNewsletter = [makeIDValidator()];
