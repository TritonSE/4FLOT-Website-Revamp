"use strict";
/*
 * Defines the schema for a newsletter subscriber
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subscriberSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    memberSince: { type: String },
    quarterlyUpdates: { type: Boolean },
    specialUpdates: { type: Boolean },
});
exports.default = (0, mongoose_1.model)("Subscriber", subscriberSchema);
