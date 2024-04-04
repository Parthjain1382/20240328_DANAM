//import the donorController
import donorController from "../controller/donorController.js";

// Creating an Express Router
import express from "express";
import { Router } from "express";
import requireLogin from "../middleware/requireLogin.js";

// Creating an Express Router
const router = express.Router();

//Get all the User whose role is "CompanyUser"
router.get("/donorList", donorController.donorList);

router.get("/causes", donorController.getAllCauses);

// API endpoint for donor to make a payment to an orphanage
router.post("/donate", requireLogin, donorController.createDonation);

router.get("/getprofile", requireLogin, donorController.getUserProfile);

router.get("/getCause", donorController.getCauseById);

router.get("/getOrganization", donorController.organizationById);

//To change the Funds Raised and FundsNeeded in the Cause Database
router.put('/CauseDataChange',requireLogin,donorController.putCause)

//To change the numberofDonates and contribution Amount 
router.put('/userDonate',requireLogin,donorController.userDonate)

router.get('/getDonor',requireLogin,donorController.getDonor)
export default router;
