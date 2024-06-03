"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecord = void 0;
const express_validator_1 = require("express-validator");
const makeIDValidator = () => (0, express_validator_1.body)("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
const makeCardValidator = () => (0, express_validator_1.body)("card")
    .exists()
    .withMessage("card is required")
    .bail()
    .isString()
    .withMessage("card must be a string")
    .bail()
    .notEmpty()
    .withMessage("card cannot be empty");
const makeDateValidator = () => (0, express_validator_1.body)("date")
    .exists()
    .withMessage("date is required")
    .bail()
    .isString()
    .withMessage("date must be a string")
    .bail()
    .notEmpty()
    .withMessage("date cannot be empty");
exports.updateRecord = [makeIDValidator(), makeCardValidator(), makeDateValidator()];
