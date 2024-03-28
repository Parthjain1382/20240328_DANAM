//import the orphanageController 
import orphanageController from "../controller/orphanageController.js";
import  requireLogin  from '../middleware/requireLogin.js';

// Creating an Express Router
const orphanageRouter = express.Router();

// Creating an Express Router
import express from "express";
import { Router } from "express";

//Get the orphanage List which is closest to the today's date
orphanageRouter.get('/orphanageList', orphanageController.orphanageList)

//Post the New Orphanage in the Collection
orphanageRouter.post('/addNewOrphanage',requireLogin,orphanageController.addNewOrphanage)


export default orphanageRouter