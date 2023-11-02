import express from "express";
const router = express.Router();
import { createPost, deletePost, getAllPost, getPost, updatePost } from "../controllers/postControllers";
import { authGuard, adminGuard } from "../middleware/authMiddleware";



router.route("/").post(authGuard, createPost).get(getAllPost);
//if hit put run in function, if hit delete run the inside function
router.route("/:slug").put(authGuard, updatePost).delete(authGuard, deletePost).get(getPost);
router.post("/createPost", authGuard, createPost);


export default router;
