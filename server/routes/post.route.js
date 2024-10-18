import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import isLoggedIn from "../middleware/authMiddlware.js";
const router = express.Router();

router.post("/create", isLoggedIn, createPost);
router.get("/posts", getAllPosts);

export default router;