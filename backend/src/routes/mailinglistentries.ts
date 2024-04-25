import express from "express";
import * as MailingListController from "src/controllers/mailinglistentries";
import * as MailingListValidator from "src/validators/mailinglistentries";

const router = express.Router();

router.get("/", MailingListController.getAllMailingListEntries);
router.get("/:id", MailingListValidator.getMailingListEntryValidator, MailingListController.getMailingListEntry);
router.put(
  "/:id", // getNewsletter validator works to just check ID
  MailingListValidator.getMailingListEntryValidator,
  MailingListController.updateMailingListEntry,
);
router.post("/", MailingListValidator.createMailingListEntryValidator, MailingListController.createMailingListEntry);

router.delete(
    "/:id", 
    MailingListController.deleteMailingListEntry,
  );

export default router;