//import the donorController 
import donorController from "../controller/donorController.js";

// Creating an Express Router
import express from "express";
import { Router } from "express";
import requireLogin from "../middleware/requireLogin.js";

// Creating an Express Router
const donorRouter=express.Router()

//Get all the User whose role is "CompanyUser"
donorRouter.get('/donorList', donorController.donorList)

// API endpoint for donor to make a payment to an orphanage
donorRouter.post('/donate',requireLogin, donorController.donate)

export default donorRouter
