/*
 * Newsletter subscription route requests.
 */

import express from "express";
import * as SubscriberController from "src/controllers/subscriber";
import * as SubscriberValidator from "src/validators/subscriber";

const router = express.Router();

router.post("/", SubscriberValidator.createSubscriber, SubscriberController.createSubscriber);

export default router;
