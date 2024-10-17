const mongoose = require("mongoose");
require('dotenv').config()

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
        });
        console.log("DB Connection Successful");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1);
    }
}

module.exports = connectToDatabase;