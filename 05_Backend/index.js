// External dependencies
import express from "express";
import 'dotenv/config';
import cors from 'cors';
import { connectDatabase } from "./database.js";
import authRoutes from './router/auth.js';
import orgRoutes from './router/organization.js';
import userRoutes from './router/users.js';
import adminRoutes from './router/admin.js';
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB and start server if successful, otherwise log error
connectDatabase().then(() => {
    // Routes
    app.use('/', authRoutes);
    app.use('*', cloudinaryConfig);
    app.use('/org', orgRoutes);
    app.use('/donor', userRoutes);
    app.use('/admin', adminRoutes);

    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running. Listening on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the process with error status code
});