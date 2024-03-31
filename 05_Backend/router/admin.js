//import the controller
import { getAllPendingCauses } from '../controller/adminController';

// Creating an Express Router
import express from "express";
import { Router } from "express";

const router = express.Router();

router.get('/requests', getAllPendingCauses);


// Exporting the router
export default router;
