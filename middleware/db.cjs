const mongoose = require("mongoose");
require('dotenv').config()
const logger = require('./logger.cjs');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
        });
        logger.info("DB Connection Successful");
    } catch (error) {
        logger.error("Error connecting to database:", error.message);
        process.exit(1);
    }
}

module.exports = connectToDatabase;