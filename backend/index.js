import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./src/db/db.js";
import dotenv from "dotenv"
// dotenv.config({})

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
    res.send("server is working properly");
});

db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
});