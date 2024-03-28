// database.js

import mongoose from "mongoose";

export function connectDatabase() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(" Connected to Database Successfully ");
        })
        .catch(error => {
            console.error("Error connecting to database:", error);
        });
}
