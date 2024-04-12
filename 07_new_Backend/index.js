// External dependencies
import express from "express";
import 'dotenv/config';
import cors from 'cors';
import { connectDatabase } from "./database.js";

// Connect to MongoDB
connectDatabase();

// Middleware
const app = express();
app.use(cors());
app.use(express.json());


// Internal dependencies


// RoutesS
app.use('/', authRoutes);
app.use('/org',orgRoutes );
app.use('/donor',userRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server is running Listening on port ${PORT}`);
});
