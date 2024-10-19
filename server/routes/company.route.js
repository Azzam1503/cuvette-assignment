import express from "express";
import { createCompany, login, verify } from "../controllers/company.controller.js";

const router = express.Router();
router.post("/create", createCompany);
router.post("/verify", verify);
router.post("/login", login);

export default router;