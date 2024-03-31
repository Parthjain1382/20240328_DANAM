import express from 'express';
import { userSignup } from '../controller/authController.js';
import { userLogin } from '../controller/authController.js';
import { forget_password } from '../controller/authController.js';
import { reset_password } from '../controller/authController.js';


const router = express.Router();

// Route for user signup
router.post('/signup', userSignup);

router.post('/login', userLogin);

router.post('/forgotpassword',forget_password)
router.post('/resetpassword',reset_password)

export default router;