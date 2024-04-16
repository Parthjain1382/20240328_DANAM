import express from "express";
import  createCause  from "../controller/orgController.js";
import requireLogin from "../middleware/requireLogin.js";
import { multerUploads } from "../middleware/multerMiddleware.js";

const router = express.Router();

// Route for creating a cause

router.post("/cause", requireLogin, createCause.createCause);

router.post('/upload', multerUploads,createCause.upload)
export default router;
