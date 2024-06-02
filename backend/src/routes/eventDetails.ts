import express from "express";
import * as EventDetailsController from "src/controllers/eventDetails";
import * as EventDetailsValidator from "src/validators/eventDetails";

const router = express.Router();

router.get("/", EventDetailsController.getAllEventDetails);
router.get("/:id", EventDetailsValidator.getEventDetails, EventDetailsController.getEventDetails);
router.put(
  "/:id", // getEventDetails validator works to just check ID
  EventDetailsValidator.getEventDetails,
  EventDetailsController.updateEventDetails,
);
router.post(
  "/",
  EventDetailsValidator.createEventDetails,
  EventDetailsController.createEventDetails,
);
router.delete(
  "/:id",
  EventDetailsValidator.deleteEventDetails,
  EventDetailsController.deleteEventDetails,
);

export default router;
