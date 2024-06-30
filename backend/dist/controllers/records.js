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
exports.updateRecord = exports.getRecord = void 0;
const records_1 = __importDefault(require("../models/records"));
const getRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { card } = req.params;
    try {
        const updatedRecord = yield records_1.default.findOne({ card });
        if (updatedRecord === null) {
            res.status(404);
        }
        res.status(200).json(updatedRecord);
    }
    catch (error) {
        next(error);
    }
});
exports.getRecord = getRecord;
const updateRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { card } = req.params;
    try {
        console.log("req.body: ", req.body);
        const record = yield records_1.default.findOneAndUpdate({ card: card }, req.body);
        if (record === null) {
            res.status(404);
        }
        const updatedRecord = yield records_1.default.findOne({ card });
        if (updatedRecord === null) {
            res.status(404);
        }
        if (card === "home" || card === "about" || card === "involved" || card === "impact") {
            const pageRecord = yield records_1.default.findOneAndUpdate({ card: "page-editor" }, { date: req.body.date });
            if (pageRecord === null) {
                res.status(404);
            }
        }
        res.status(200).json(updatedRecord);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRecord = updateRecord;
