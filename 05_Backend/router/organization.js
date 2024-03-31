import express from "express";
import { organizationProfile } from "../controller/orgController";

const router = express.Router();

// Route for getting charity profile
router.get('/profile/:name', organizationProfile);

export default router