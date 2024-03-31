import express from 'express';
import { orgLogin, userSignup } from '../controller/authController.js';
import { userLogin } from '../controller/authController.js';
import { orgSignup } from '../controller/authController.js';


const router = express.Router();

// Route for user signup
router.post('/signup', userSignup);

router.post('/login', userLogin);

router.post('/org/signup', orgSignup);

router.post('/org/login', orgLogin);

export default router;