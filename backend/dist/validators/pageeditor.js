"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageEditor = exports.getPageEditor = void 0;
const express_validator_1 = require("express-validator");
const makeIDValidator = () => (0, express_validator_1.body)("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isString()
    .withMessage("_id must be a number");
const makePageValidator = () => (0, express_validator_1.body)("page")
    .exists()
    .withMessage("image is required")
    .bail()
    .isString()
    .withMessage("image must be a string");
const makeSubtitleValidator = () => (0, express_validator_1.body)("ph_subtitle")
    .exists()
    .withMessage("subtitle is required")
    .bail()
    .isString()
    .withMessage("subtitle must be a string");
const makeTitleValidator = () => (0, express_validator_1.body)("s1_title")
    .exists()
    .withMessage("date is required")
    .bail()
    .isString()
    .withMessage("date must be a string");
const makeTextValidator = () => (0, express_validator_1.body)("s1_text")
    .exists()
    .withMessage("content is required")
    .bail()
    .isString()
    .withMessage("content must be a string");
exports.getPageEditor = [makePageValidator()];
exports.createPageEditor = [
    makeIDValidator(),
    makePageValidator(),
    makeSubtitleValidator(),
    makeTitleValidator(),
    makeTextValidator(),
];
