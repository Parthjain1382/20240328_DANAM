//import the controller
// import { getAllPendingCauses } from '../controller/adminController.js';
// import {getAllPendingCauses} from  "../controller/adminController.js"
import getAllPendingCauses from "../controller/adminController.js"

// Creating an Express Router
import express from "express";
import { Router } from "express";

const router = express.Router();


//error here
// router.get('/requests', getAllPendingCauses);


// Exporting the router
export default router;
