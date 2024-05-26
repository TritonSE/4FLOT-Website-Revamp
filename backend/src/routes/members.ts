import express from "express";
import * as MembersController from "src/controllers/member";
import * as MembersValidator from "src/validators/member"

const router = express.Router();

router.get("/get", MembersController.getAllMembers);
router.get("/:id", MembersController.getMember);
router.post("/post", MembersValidator.createMember, MembersController.createMember);
router.put(
    "/:id", MembersController.updateMember,
  );
router.delete("/:id", MembersController.deleteMember);

export default router;
