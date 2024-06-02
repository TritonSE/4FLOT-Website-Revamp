"use strict";
/*
 * Normalize and validate emails for newsletter subscribers
 * in the route handler.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriber = exports.createSubscriber = void 0;
const express_validator_1 = require("express-validator");
const subscriber_1 = __importDefault(require("../models/subscriber"));
/*
 * 1. Trim whitespace then
 * 2. check if empty then
 * 3. check if valid email then
 * 4. normalize email then
 * 5. check if email already exists in db
 */
const makeIDValidator = () => (0, express_validator_1.body)("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isString()
    .withMessage("_id must be a number");
const makeEmailValidator = () => (0, express_validator_1.body)("email")
    .trim()
    .exists()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email must be a valid email address")
    .bail()
    .normalizeEmail()
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    // check if email already exists in db
    const subscriber = yield subscriber_1.default.findOne({ email: value }).exec();
    if (subscriber !== null) {
        return Promise.reject(`email is already subscribed`);
    }
}));
const makeFirstNameValidator = () => (0, express_validator_1.body)("firstName").optional().isString().withMessage("firstName must be a string");
const makeLastNameValidator = () => (0, express_validator_1.body)("lastName").optional().isString().withMessage("lastName must be a string");
const makeQuarterlyUpdatesValidator = () => (0, express_validator_1.body)("quarterlyUpdates").optional().isBoolean().withMessage("quarterlyUpdates must be a boolean");
const makeSpecialUpdatesValidator = () => (0, express_validator_1.body)("specialUpdates").optional().isBoolean().withMessage("specialUpdates must be a boolean");
exports.createSubscriber = [
    makeEmailValidator(),
    makeFirstNameValidator(),
    makeLastNameValidator(),
    makeQuarterlyUpdatesValidator(),
    makeSpecialUpdatesValidator(),
];
exports.deleteSubscriber = [makeIDValidator()];
