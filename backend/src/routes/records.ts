import express from "express";
import * as RecordsController from "src/controllers/records";
import * as RecordsValidator from "src/validators/records";

const router = express.Router();

router.put("/:card", RecordsValidator.updateRecord, RecordsController.updateRecord);
router.get("/:card", RecordsController.getRecord);

export default router;
