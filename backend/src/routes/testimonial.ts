import express from "express";
import * as TestimonialController from "src/controllers/testimonial";
import * as TestimonialValidator from "src/validators/testimonial";

const router = express.Router();

router.get("/get", TestimonialController.getAllTestimonials);
router.get("/get/quote", TestimonialController.getAllQuotes);
router.post("/post", TestimonialController.createTestimonial);
router.put(
  "/:id", // getNewsletter validator works to just check ID
  TestimonialValidator.updateTestimonial,
  TestimonialController.updateTestimonial,
);

export default router;
