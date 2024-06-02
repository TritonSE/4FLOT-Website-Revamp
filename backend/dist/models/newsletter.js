"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newsletterSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Newsletters", newsletterSchema);
