"use strict";
/*
 * Controller for the newsletter subscriber route, /api/subscribers.
 * passes error handling off to /src/util/validationErrorParser.ts
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
exports.deleteSubscriber = exports.getAllSubscribers = exports.createSubscriber = void 0;
const express_validator_1 = require("express-validator");
const subscriber_1 = __importDefault(require("../models/subscriber"));
const validationErrorParser_1 = __importDefault(require("../util/validationErrorParser"));
const http_errors_1 = __importDefault(require("http-errors"));
const createSubscriber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { email } = req.body;
    let memSince;
    if (req.body.memberSince) {
        memSince = req.body.memberSince;
    }
    else {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        memSince = `${year}-${month}-${day}`;
    }
    try {
        (0, validationErrorParser_1.default)(errors);
        const subscriber = yield subscriber_1.default.create({
            email: email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            memberSince: memSince,
            quarterlyUpdates: req.body.quarterlyUpdates,
            specialUpdates: req.body.specialUpdates,
        });
        res.status(201).json(subscriber);
    }
    catch (error) {
        next(error);
    }
});
exports.createSubscriber = createSubscriber;
const getAllSubscribers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailingListEntries = yield subscriber_1.default.find({});
        if (!mailingListEntries || mailingListEntries.length === 0) {
            return res.status(200).json({ message: "No mailing list entries found." });
        }
        // const formattedMailingList = mailingListEntries.map((entry) => {
        //   if (!entry.firstName) {
        //     entry.firstName = "";
        //   }
        //   if (!entry.lastName) {
        //     entry.lastName = "";
        //   }
        // });
        res.status(200).json(mailingListEntries);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSubscribers = getAllSubscribers;
const deleteSubscriber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subscriber = yield subscriber_1.default.findByIdAndDelete(id);
        if (!subscriber) {
            throw (0, http_errors_1.default)(404, "Subscriber not found.");
        }
        res.status(200).json(subscriber);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSubscriber = deleteSubscriber;
