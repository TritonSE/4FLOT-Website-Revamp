"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventDetails = exports.createEventDetails = void 0;
const express_validator_1 = require("express-validator");
const makeIDValidator = () => (0, express_validator_1.body)("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
const makeNameValidator = () => (0, express_validator_1.body)("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string");
const makeDescriptionValidator = () => (0, express_validator_1.body)("description")
    .exists()
    .withMessage("description is required")
    .bail()
    .isString()
    .withMessage("description must be a string");
const makeGuidlinesValidator = () => (0, express_validator_1.body)("guidelines")
    .exists()
    .withMessage("guidelines is required")
    .bail()
    .isString()
    .withMessage("guidelines must be a string");
const makeDateValidator = () => (0, express_validator_1.body)("date")
    .exists()
    .withMessage("date is required")
    .bail()
    .isString()
    .withMessage("date must be a string");
const makeLocationValidator = () => (0, express_validator_1.body)("location")
    .exists()
    .withMessage("location is required")
    .bail()
    .isString()
    .withMessage("location must be a string");
const makeImageURIValidator = () => (0, express_validator_1.body)("imageURI")
    .exists()
    .withMessage("imageURI is required")
    .bail()
    .isString()
    .withMessage("imageURI must be a string")
    .bail()
    .isURL()
    .withMessage("imageURI must be a URL");
exports.createEventDetails = [
    makeNameValidator(),
    makeDescriptionValidator(),
    makeGuidlinesValidator(),
    makeDateValidator(),
    makeLocationValidator(),
    makeImageURIValidator(),
];
exports.getEventDetails = [makeIDValidator()];
