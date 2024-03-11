import express from "express";
import * as EmailController from "src/controllers/emails";

const router = express.Router();

router.post("/", EmailController.createEmail);

export default router;
