import express from "express";
import * as TestimonialController from "src/controllers/testimonial";
import * as TestimonialValidator from "src/validators/testimonial";

const router = express.Router();

router.get("/get", TestimonialController.getAllTestimonials);
router.get("/get/quote", TestimonialController.getAllQuotes);
router.post("/post", TestimonialController.createTestimonial);
router.put("/:id", TestimonialValidator.updateTestimonial, TestimonialController.updateTestimonial);
router.delete(
  "/:id",
  TestimonialValidator.deleteTestimonial,
  TestimonialController.deleteTestimonial,
);

export default router;
