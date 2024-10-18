import express from "express";
import { createPost } from "../controllers/post.controller.js";
import isLoggedIn from "../middleware/authMiddlware.js";
const router = express.Router();

router.post("/create", isLoggedIn, createPost);

export default router;