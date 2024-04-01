import express from 'express';
import { createCause } from '../controller/orgController.js';
import requireLogin from '../middleware/requireLogin.js';

const router = express.Router();

// Route for creating a cause
router.post('/cause', requireLogin, createCause);

export default router;
