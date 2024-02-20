import express from "express";
import * as EventDetailsController from "src/controllers/eventDetails";
import * as EventDetailsValidator from "src/validators/eventDetails";

const router = express.Router();

router.get("/", EventDetailsController.getAllEventDetails);
router.get("/:id", EventDetailsValidator.getTask, EventDetailsController.getEventDetails);
