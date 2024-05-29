import express from "express";
import * as PageEditorController from "src/controllers/pageeditor";
import * as PageEditorValidator from "src/validators/pageeditor";

const router = express.Router();

router.get("/:name", PageEditorValidator.getPageEditor, PageEditorController.getPage);
router.put("/:name", PageEditorValidator.updatePageEditor, PageEditorController.updatePageEditor);

export default router;
