"use strict";
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
exports.deleteNewsletter = exports.updateNewsletter = exports.createNewsletter = exports.getNewsletter = exports.getAllNewsletters = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const newsletter_1 = __importDefault(require("../models/newsletter"));
const validationErrorParser_1 = __importDefault(require("../util/validationErrorParser"));
const getAllNewsletters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsletters = yield newsletter_1.default.find({});
        if (!newsletters) {
            res.status(200).json({ message: "No newsletters found." });
        }
        res.status(200).json(newsletters);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllNewsletters = getAllNewsletters;
const getNewsletter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const newsletter = yield newsletter_1.default.findById(id);
        if (!newsletter) {
            throw (0, http_errors_1.default)(404, "Newsletter not found.");
        }
        res.status(200).json(newsletter);
    }
    catch (error) {
        next(error);
    }
});
exports.getNewsletter = getNewsletter;
const createNewsletter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { image, title, description, date, content } = req.body;
    try {
        (0, validationErrorParser_1.default)(errors);
        const newsletter = yield newsletter_1.default.create({
            image,
            title,
            description,
            date,
            content,
        });
        console.log("newsletter: ", newsletter);
        res.status(201).json(newsletter);
    }
    catch (error) {
        console.error("Error creating newsletter:", error);
        next(error);
    }
});
exports.createNewsletter = createNewsletter;
const updateNewsletter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { id } = req.params;
    if (id !== req.body._id) {
        // If the _id in the URL does not match the _id in the body, bad request
        res.status(400);
    }
    try {
        (0, validationErrorParser_1.default)(errors);
        const newsletter = yield newsletter_1.default.findByIdAndUpdate(id, req.body);
        if (newsletter === null) {
            // No newsletter found
            res.status(404);
        }
        const updatedNewsletter = yield newsletter_1.default.findById(id);
        if (updatedNewsletter === null) {
            // No newsletter found, something went wrong
            res.status(404);
        }
        res.status(200).json(updatedNewsletter);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNewsletter = updateNewsletter;
const deleteNewsletter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const newsletter = yield newsletter_1.default.findByIdAndDelete(id);
        if (!newsletter) {
            throw (0, http_errors_1.default)(404, "Newsletter not found.");
        }
        res.status(200).json(newsletter);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNewsletter = deleteNewsletter;
