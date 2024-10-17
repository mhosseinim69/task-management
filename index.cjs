const express = require("express");
const cors = require("cors");
const app = express();
const connectToDatabase = require("./middleware/db.cjs");
require('dotenv').config();
const verifyUserToken = require("./middleware/auth.cjs");
const userRoute = require("./components/users/user.route.cjs");
const errorHandler = require('./middleware/errorHandler.cjs');

app.use(cors());
app.use(express.json());

app.use("/task/", userRoute);

app.use(errorHandler);

connectToDatabase()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
        process.exit(1);
    });