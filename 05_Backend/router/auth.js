//import the controller
import userController from "../controller/authController.js";

// Creating an Express Router
import express from "express";
import { Router } from "express";

const authRouter = express.Router();


//signUp
authRouter.post("/signup", userController.signUp); 

// //For SignIn
authRouter.post('/signin', userController.login);

// Exporting the router
export default authRouter;
