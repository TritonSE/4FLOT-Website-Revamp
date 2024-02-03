import express from "express";
import * as TestimonialController from "src/controllers/testimonial";

const router = express.Router();

router.get("/get", TestimonialController.getAllTestimonials);
router.post("/post", TestimonialController.createTestimonial);

export default router;
