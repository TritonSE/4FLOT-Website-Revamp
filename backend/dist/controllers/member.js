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
exports.deleteMember = exports.updateMember = exports.getAllMembers = exports.getMember = exports.createMember = void 0;
const member_1 = __importDefault(require("../models/member"));
const mongoose_1 = require("mongoose");
const validationErrorParser_1 = __importDefault(require("../util/validationErrorParser"));
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const createMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, profilePictureURL } = req.body;
    try {
        const member = yield member_1.default.create({
            name: name,
            role: role,
            profilePictureURL: profilePictureURL,
        });
        res.status(201).json(member);
    }
    catch (error) {
        next(error);
    }
});
exports.createMember = createMember;
const getMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const member = mongoose_1.Types.ObjectId.isValid(id) ? yield member_1.default.findById(id) : null;
        res.status(200).json(member);
    }
    catch (error) {
        next(error);
    }
});
exports.getMember = getMember;
const getAllMembers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield member_1.default.find({});
        res.status(200).json(members);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllMembers = getAllMembers;
const updateMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { id } = req.params;
    // if (id !== req.body._id) {
    //   // If the _id in the URL does not match the _id in the body, bad request
    //   res.status(400);
    // }
    try {
        (0, validationErrorParser_1.default)(errors);
        const member = yield member_1.default.findByIdAndUpdate(id, req.body);
        if (member === null) {
            // No event found
            res.status(404);
        }
        const updatedMember = yield member_1.default.findById(id);
        if (updatedMember === null) {
            // No event found, something went wrong
            res.status(404);
        }
        res.status(200).json(updatedMember);
    }
    catch (error) {
        next(error);
    }
});
exports.updateMember = updateMember;
const deleteMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const member = yield member_1.default.findByIdAndDelete(id);
        if (!member) {
            throw (0, http_errors_1.default)(404, "Member not found.");
        }
        res.status(200).json(member);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMember = deleteMember;
