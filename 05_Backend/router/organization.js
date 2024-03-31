import express from "express";
import { organizationProfile } from "../controller/orgController.js";

const router = express.Router();

// Route for getting charity profile
router.get('/profile/:name', organizationProfile);

export default router