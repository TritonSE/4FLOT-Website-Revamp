"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const volunteerDetailsSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    signed_up_for_updates: {
        type: Boolean,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)("VolunteerDetails", volunteerDetailsSchema);
