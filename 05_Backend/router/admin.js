//import the controller

import adminController from "../controller/adminController.js"
import requireLogin from "../middleware/requireLogin.js";

//importing the middleware

// Creating an Express Router
import express from "express";
import { Router } from "express";

const router = express.Router();

//error here
router.get('/requests', adminController.getAllPendingCauses);

router.put('/update/request', adminController.updateCauseStatus);

// Exporting the router
export default router;
