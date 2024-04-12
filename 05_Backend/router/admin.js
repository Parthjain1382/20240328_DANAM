//import the controller

import adminController from "../controller/adminController.js"
import requireLogin from "../middleware/requireLogin.js";

//importing the middleware

// Creating an Express Router
import express from "express";
import { Router } from "express";

const router = express.Router();
//for charity-request page in frontend
router.get('/requests',requireLogin,adminController.getAllPendingCauses);

router.put('/update/request', requireLogin,adminController.updateCauseStatus);

router.delete('/deleteCause',requireLogin,adminController.deleteCause)

//for chariy list page in the the frontend
router.get('/orgDetails',requireLogin,adminController.orgDetails)


router.get('/donationList',requireLogin,adminController.donationList)
// Exporting the router
export default router;
