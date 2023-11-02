import express from "express";
const router = express.Router();
import { createComment, deleteComment, updateComment, readAllUncheckComment} from "../controllers/commentControllers";
import { authGuard } from "../middleware/authMiddleware";

router.post("/", authGuard, createComment);
router.route("/:commentId").put(authGuard, updateComment).delete(authGuard, deleteComment);
router.get("/readAllUncheckComment", authGuard, readAllUncheckComment)

export default router;
