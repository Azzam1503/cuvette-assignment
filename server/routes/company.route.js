import express from "express";
import { createCompany, login } from "../controllers/company.controller.js";

const router = express.Router();
router.post("/create", createCompany);
router.post("/login", login);

export default router;