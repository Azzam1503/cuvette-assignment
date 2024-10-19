import express from "express";
import { createCompany, login, verify, sendOtp, logout } from "../controllers/company.controller.js";

const router = express.Router();
router.post("/create", createCompany);
router.post("/verify", verify);
router.post("/send-otp", sendOtp);
router.post("/login", login);
router.post("/logout", logout);

export default router;