"use strict";
/**
 * Initializes mongoose and express.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const PORT = validateEnv_1.default.PORT;
const MONGODB_URI = validateEnv_1.default.MONGODB_URI;
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log("Mongoose connected!");
    app_1.default.listen(PORT, () => {
        console.log(`Server running on ${PORT}.`);
    });
})
    .catch(console.error);
module.exports = app_1.default;
