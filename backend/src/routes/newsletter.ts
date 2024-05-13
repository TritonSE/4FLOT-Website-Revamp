import express from "express";
import * as NewsletterController from "src/controllers/newsletter";
import * as NewsletterValidator from "src/validators/newsletter";

const router = express.Router();

router.get("/", NewsletterController.getAllNewsletters);
router.get("/:id", NewsletterValidator.getNewsletter, NewsletterController.getNewsletter);
router.put(
  "/:id", // getNewsletter validator works to just check ID
  NewsletterValidator.getNewsletter,
  NewsletterController.updateNewsletter,
);
router.post("/", NewsletterValidator.createNewsletter, NewsletterController.createNewsletter);
router.delete("/:id", NewsletterValidator.deleteNewsletter, NewsletterController.deleteNewsletter);

export default router;
