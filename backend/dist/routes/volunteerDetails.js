"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const volunteeerDetails_1 = require("../controllers/volunteeerDetails");
const volunteerDetailsRoutes = express_1.default.Router();
// Define routes
volunteerDetailsRoutes.get("/:id", volunteeerDetails_1.getVolunteer);
volunteerDetailsRoutes.get("/", volunteeerDetails_1.getAllVolunteers);
volunteerDetailsRoutes.post("/", volunteeerDetails_1.addVolunteer);
exports.default = volunteerDetailsRoutes;
