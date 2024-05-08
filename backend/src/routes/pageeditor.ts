import express from "express";
import * as PageEditorController from "src/controllers/pageeditor";
import * as PageEditorValidator from "src/validators/pageeditor";

const router = express.Router();

router.get("/:page", PageEditorValidator.getPageEditor, PageEditorController.getPage);
router.put(
  "/:page", // getPageEditor validator works to just check page
  //   PageEditorValidator.getPageEditor,
  PageEditorController.updatePageEditor,
);

export default router;
