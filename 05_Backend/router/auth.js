import express from 'express';
import { userSignup } from '../controller/authController.js';
import { userLogin } from '../controller/authController.js';


const router = express.Router();

// Route for user signup
router.post('/signup', userSignup);

router.post('/login', userLogin);

export default router;