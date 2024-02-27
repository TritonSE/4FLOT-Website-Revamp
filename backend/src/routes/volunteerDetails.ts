import express from "express";
import { getVolunteer, getAllVolunteers, addVolunteer } from "../controllers/volunteeerDetails";

const volunteerDetailsRoutes = express.Router();

// Define routes
volunteerDetailsRoutes.get("/:id", getVolunteer);
volunteerDetailsRoutes.get("/", getAllVolunteers);
volunteerDetailsRoutes.post("/", addVolunteer);

export default volunteerDetailsRoutes;
