const express = require("express");
const cors = require("cors");
const app = express();
const connectToDatabase = require("./middleware/db.cjs");
require('dotenv').config();
const verifyUserToken = require("./middleware/auth.cjs");
const errorHandler = require('./middleware/errorHandler.cjs');
const logger = require('./middleware/logger.cjs');
const userRoute = require("./components/user/user.route.cjs");
const taskRoute = require("./components/task/task.route.cjs");

app.use(cors());
app.use(express.json());

app.use("/taskmanagement/", userRoute);
app.use("/taskmanagement/", verifyUserToken, taskRoute);

app.use(errorHandler);

connectToDatabase()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
        });
    })
    .catch((error) => {
        logger.error("Error connecting to database:", error);
        process.exit(1);
    });