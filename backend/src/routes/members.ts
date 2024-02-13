import express from "express";
import * as MembersController from "src/controllers/member";

const router = express.Router();

router.get("/get", MembersController.getAllMembers);
router.post("/post", MembersController.createMember);

export default router;
