import UserController from "../controller/userController.js"

// Creating an Express Router
const userRouter = express.Router();

// Creating an Express Router
import express from "express";
import { Router } from "express";

//To display data on Landing Page which is unauthorized
userRouter.get('/LandingPageDetails',  UserController.LandingPageDetails)

export default userRouter