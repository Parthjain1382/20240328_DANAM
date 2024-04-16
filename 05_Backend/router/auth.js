import express from 'express';
import { orgLogin, orgSignup, userSignup } from '../controller/authController.js';
import { userLogin } from '../controller/authController.js';
import { forget_password } from '../controller/authController.js';
import { reset_password } from '../controller/authController.js';


const router = express.Router();

// Route for user signup and login
router.post('/signup', userSignup);
router.post('/login', userLogin);

//Forgot and reset Password
router.post('/forgot_password',forget_password)
router.post('/resetpassword',reset_password)


// Route for Organization signup and login
router.post('/org/signup',orgSignup)
router.post('/org/login', orgLogin);

export default router;