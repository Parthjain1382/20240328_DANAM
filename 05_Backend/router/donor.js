//import the donorController 
import { getAllCauses, createDonation } from "../controller/donorController.js";


// Creating an Express Router
import express from "express";
import { Router } from "express";
import requireLogin from "../middleware/requireLogin.js";

// Creating an Express Router
<<<<<<< HEAD:05_Backend/router/users.js
const router=express.Router()

//Get all the User whose role is "CompanyUser"
router.get('/donorList', donorController.donorList)

// API endpoint for donor to make a payment to an orphanage
router.post('/donate',requireLogin, donorController.donate)

router.get('/getprofile',requireLogin, donorController.getUserProfile)

=======
const router = express.Router()

//Get all the User whose role is "CompanyUser"
router.get('/causes', getAllCauses)

// API endpoint for donor to make a payment to an orphanage
router.post('/donate', requireLogin, createDonation)

>>>>>>> 6de0b5dc6d464d29a47cf3e8561d770fc5401e44:05_Backend/router/donor.js
export default router
