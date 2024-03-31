// External dependencies
import express from "express";
import 'dotenv/config';
import cors from 'cors';
import { connectDatabase } from "./database.js";
import authRoutes from './router/auth.js';
import donorRoutes from './router/donor.js';
import adminRoutes from './router/admin.js';
import orgRoutes from './router/organization.js';

// Connect to MongoDB
connectDatabase();

// Middleware
const app = express();
app.use(cors());
app.use(express.json());


// Internal dependencies


// RoutesS
app.use('/auth', authRoutes);
app.use('/donor', donorRoutes);
app.use('/admin', adminRoutes);
app.use('/charity', orgRoutes);



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server is running Listening on port ${PORT}`);
});
