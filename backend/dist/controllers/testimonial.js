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
exports.deleteTestimonial = exports.updateTestimonial = exports.getAllQuotes = exports.getAllTestimonials = exports.createTestimonial = void 0;
const testimonial_1 = __importDefault(require("../models/testimonial"));
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const validationErrorParser_1 = __importDefault(require("../util/validationErrorParser"));
const createTestimonial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image, type } = req.body;
    try {
        const testimonial = yield testimonial_1.default.create({
            title: title,
            description: description,
            image: image,
            type: type,
        });
        res.status(201).json(testimonial);
    }
    catch (error) {
        next(error);
    }
});
exports.createTestimonial = createTestimonial;
const getAllTestimonials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield testimonial_1.default.find({});
        res.status(200).json(testimonials);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTestimonials = getAllTestimonials;
const getAllQuotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield testimonial_1.default.find({ type: "quote" });
        res.status(200).json(testimonials);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllQuotes = getAllQuotes;
const updateTestimonial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { id } = req.params;
    if (id !== req.body._id) {
        // If the _id in the URL does not match the _id in the body, bad request
        res.status(400);
    }
    try {
        (0, validationErrorParser_1.default)(errors);
        const testimonial = yield testimonial_1.default.findByIdAndUpdate(id, req.body);
        if (testimonial === null) {
            // No newsletter found
            res.status(404);
        }
        const updatedTestimonial = yield testimonial_1.default.findById(id);
        if (updatedTestimonial === null) {
            // No testimonial found, something went wrong
            res.status(404);
        }
        res.status(200).json(updatedTestimonial);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTestimonial = updateTestimonial;
const deleteTestimonial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const testimonial = yield testimonial_1.default.findByIdAndDelete(id);
        if (!testimonial) {
            throw (0, http_errors_1.default)(404, "Testimonial not found.");
        }
        res.status(200).json(testimonial);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTestimonial = deleteTestimonial;
