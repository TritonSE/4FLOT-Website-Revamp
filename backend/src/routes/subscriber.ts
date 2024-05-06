import express from "express";
import * as SubscriberController from "src/controllers/subscriber";
import * as SubscriberValidator from "src/validators/subscriber";

const router = express.Router();

router.post("/", SubscriberValidator.createSubscriber, SubscriberController.createSubscriber);
router.get("/", SubscriberController.getAllSubscribers);
router.delete("/:id", SubscriberValidator.deleteSubscriber, SubscriberController.deleteSubscriber);
export default router;
