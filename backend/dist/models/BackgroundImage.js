"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundImagePages = void 0;
const mongoose_1 = require("mongoose");
var BackgroundImagePages;
(function (BackgroundImagePages) {
    BackgroundImagePages["TEAM"] = "TEAM";
    BackgroundImagePages["HOME"] = "HOME";
})(BackgroundImagePages || (exports.BackgroundImagePages = BackgroundImagePages = {}));
const backgroundImageSchema = new mongoose_1.Schema({
    imageURI: { type: String, required: true },
    page: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("BackgroundImage", backgroundImageSchema);
