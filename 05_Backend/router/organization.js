import express from "express";
import { createCause,reset_org_password,forget_org_password } from "../controller/orgController.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();

// Route for creating a cause

router.post("/cause", requireLogin, createCause);
router.post("/forgetorgpassword", forget_org_password);
router.post("/resetorgpassword", reset_org_password);

export default router;