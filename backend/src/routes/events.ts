import express from "express";
import * as EventController from "src/controllers/events";

const router = express.Router();

router.get("/get", EventController.getAllEvents);
router.post("/post", EventController.createEvent);

export default router;
