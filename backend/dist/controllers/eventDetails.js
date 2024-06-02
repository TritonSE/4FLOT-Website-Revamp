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
exports.updateEventDetails = exports.createEventDetails = exports.getEventDetails = exports.getAllEventDetails = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const eventDetails_1 = __importDefault(require("../models/eventDetails"));
const validationErrorParser_1 = __importDefault(require("../util/validationErrorParser"));
const getAllEventDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventDetails_1.default.find({});
        if (!events) {
            res.status(200).json({ message: "No events found." });
        }
        res.status(200).json(events);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEventDetails = getAllEventDetails;
const getEventDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const eventDetails = yield eventDetails_1.default.findById(id);
        if (!eventDetails) {
            throw (0, http_errors_1.default)(404, "Event not found.");
        }
        res.status(200).json(eventDetails);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventDetails = getEventDetails;
const createEventDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { name, description, guidelines, date, location, imageURI } = req.body;
    try {
        (0, validationErrorParser_1.default)(errors);
        const eventDetails = yield eventDetails_1.default.create({
            name,
            description,
            guidelines,
            date,
            location,
            imageURI,
        });
        res.status(201).json(eventDetails);
    }
    catch (error) {
        next(error);
    }
});
exports.createEventDetails = createEventDetails;
const updateEventDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { id } = req.params;
    if (id !== req.body._id) {
        // If the _id in the URL does not match the _id in the body, bad request
        res.status(400);
    }
    try {
        (0, validationErrorParser_1.default)(errors);
        const eventDetails = yield eventDetails_1.default.findByIdAndUpdate(id, req.body);
        if (eventDetails === null) {
            // No event found
            res.status(404);
        }
        const updatedEventDetails = yield eventDetails_1.default.findById(id);
        if (updatedEventDetails === null) {
            // No event found, something went wrong
            res.status(404);
        }
        res.status(200).json(updatedEventDetails);
    }
    catch (error) {
        next(error);
    }
});
exports.updateEventDetails = updateEventDetails;
