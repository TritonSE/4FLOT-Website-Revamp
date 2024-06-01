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
exports.getAllMembers = exports.getMember = exports.createMember = void 0;
const member_1 = __importDefault(require("../models/member"));
const mongoose_1 = require("mongoose");
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
