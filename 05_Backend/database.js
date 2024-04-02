// database.js

import mongoose from "mongoose";

export function connectDatabase() {
    return mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch(error => {
            console.error("Error connecting to database:", error);
            throw error; // Re-throw the error to be caught by the caller
        });
}