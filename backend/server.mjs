import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";

import "dotenv/config";
import "./mongodb.mjs";

import authRoute from "./routes/auth.mjs";

// initialization
const app = express();
app.use(express.json());
app.use(cookieParser());

// cors setup
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "*",
        credentials: true,
    })
);

// routes
app.use("/api/v1/auth", authRoute);

// protected route ( jwt authentication )
app.use("/api/v1", (req, res, next) => {

    const token = req.cookies.token;

    // console.log("token: ", token);

    try {

        const currentUser = jwt.verify(token, process.env.SECRET);

        req.currentUser = {
            ...currentUser
        };

        next();

    } catch (err) {
        console.error(err);
        res.status(401).send("unauthorized");
        return;
    }
});

// ports
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log("Server is running!");
});