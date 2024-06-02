"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pageEditorSchema = new mongoose_1.Schema({
    page: { type: String, required: true },
    pageSections: [{ type: mongoose_1.Schema.Types.Mixed, required: true }],
});
exports.default = (0, mongoose_1.model)("PageEditor", pageEditorSchema);
