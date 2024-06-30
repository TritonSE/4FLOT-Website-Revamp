"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pageEditorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    isEdited: { type: Boolean, required: true },
    fields: [
        {
            name: { type: String, required: true },
            type: { type: String, required: true },
            data: { type: mongoose_1.Schema.Types.Mixed, required: true },
        },
    ],
});
exports.default = (0, mongoose_1.model)("PageEditor", pageEditorSchema);
