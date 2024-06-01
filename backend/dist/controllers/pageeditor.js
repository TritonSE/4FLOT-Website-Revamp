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
exports.updatePageEditor = exports.getPage = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const pageeditor_1 = __importDefault(require("../models/pageeditor"));
const validationErrorParser_1 = __importDefault(require("../util/validationErrorParser"));
const getPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.params;
    try {
        const pageText = yield pageeditor_1.default.findOne({ page: page });
        if (!pageText) {
            throw (0, http_errors_1.default)(404, "Page not found.");
        }
        res.status(200).json(pageText);
    }
    catch (error) {
        next(error);
    }
});
exports.getPage = getPage;
const updatePageEditor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { page } = req.params;
    if (page !== req.body.page) {
        // If the page in the URL does not match the page in the body, bad request
        res.status(400);
    }
    try {
        (0, validationErrorParser_1.default)(errors);
        const pageText = yield pageeditor_1.default.findOneAndUpdate({ page }, req.body);
        if (pageText === null) {
            // No page found
            res.status(404);
        }
        const updatedPage = yield pageeditor_1.default.findOne({ page });
        if (updatedPage === null) {
            // No page found after updating, something went wrong
            res.status(404);
        }
        res.status(200).json(updatedPage);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePageEditor = updatePageEditor;
