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
exports.getAllTestimonials = exports.createTestimonial = void 0;
const testimonial_1 = __importDefault(require("../models/testimonial"));
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
