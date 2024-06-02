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
exports.addVolunteer = exports.getAllVolunteers = exports.getVolunteer = void 0;
const volunteerDetails_1 = __importDefault(require("../models/volunteerDetails"));
const getVolunteer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const volunteer = yield volunteerDetails_1.default.findById(id);
        if (!volunteer) {
            return res.status(404).json({ error: "Volunteer not found." });
        }
        res.status(200).json(volunteer);
    }
    catch (error) {
        next(error);
    }
});
exports.getVolunteer = getVolunteer;
const getAllVolunteers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const volunteers = yield volunteerDetails_1.default.find({});
        if (!volunteers || volunteers.length === 0) {
            return res.status(200).json({ message: "No volunteers yet!" });
        }
        res.status(200).json(volunteers);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllVolunteers = getAllVolunteers;
const addVolunteer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract volunteer data from the request body
    const volunteerData = req.body;
    try {
        // Check if any of the required fields are missing
        const requiredProperties = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "signed_up_for_updates",
        ];
        for (const prop of requiredProperties) {
            if (!Object.prototype.hasOwnProperty.call(volunteerData, prop)) {
                return res
                    .status(400)
                    .json({ error: `Missing property: ${prop}. Please provide all required fields.` });
            }
        }
        // Create a new volunteer using the extracted data
        const newVolunteer = yield volunteerDetails_1.default.create(volunteerData);
        // Respond with the newly created volunteer
        return res.status(201).json(newVolunteer);
    }
    catch (error) {
        next(error);
    }
});
exports.addVolunteer = addVolunteer;
