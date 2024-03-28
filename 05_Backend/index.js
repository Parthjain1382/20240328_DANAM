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
import authRouter from "./router/auth.js";
import userRouter from "./router/userrouter.js";
import orphanageRouter from "./router/orphanage.js";
import donorRouter from "./router/donor.js";

// Routes
app.use('/', authRouter);
app.use('/user',userRouter);
app.use('/orphanage',orphanageRouter);
app.use('/donor',donorRouter);



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server is running Listening on port ${PORT}`);
});
