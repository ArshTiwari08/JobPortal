import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { db } from "./src/db/db.js";
import userRouter from "./src/routes/user.route.js"
import companyRoute from "./src/routes/company.route.js"
import Jobs from "./src/routes/job.route.js"
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

app.use(cors(corsOptions));

// Default route
app.get("/", (req, res) => {
    res.send("<h1>Server is working properly </h1>");
});

// User API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/Company", companyRoute);
app.use("/api/v1/job", Jobs);

// Connect to database and start server
db()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });