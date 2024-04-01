//import the donorController 
import { getAllCauses, createDonation } from "../controller/donorController.js";


// Creating an Express Router
import express from "express";
import { Router } from "express";
import requireLogin from "../middleware/requireLogin.js";

// Creating an Express Router
const router=express.Router()

//Get all the User whose role is "CompanyUser"
// router.get('/donorList', donorController.donorList)
// router.get('/donorList', donorController.donorList)

// API endpoint for donor to make a payment to an orphanage
// router.post('/donate',requireLogin, donorController.donate)

router.get('/getprofile',requireLogin, donorController.getUserProfile)



//Get all the User whose role is "CompanyUser"
router.get('/causes', getAllCauses)

// API endpoint for donor to make a payment to an orphanage
router.post('/donate', requireLogin, createDonation)

export default router
