import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../Controllers/Post.js";
import { verifyToken } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

export default router;
