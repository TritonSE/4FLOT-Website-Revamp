import express from "express";
import * as BackgroundImageController from "src/controllers/BackgroundImage";

const router = express.Router();

router.get("/get", BackgroundImageController.getBackgroundImages);

export default router;
