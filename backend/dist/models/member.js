"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    profilePictureURL: { type: String },
});
exports.default = (0, mongoose_1.model)("Member", memberSchema);
