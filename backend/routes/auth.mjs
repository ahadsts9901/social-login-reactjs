import express from "express";
import { stringToHash, verifyHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken";
import axios from "axios";

let router = express.Router();

// facebook login
router.post("/api/v1/facebook-login", async(req, res, next) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        res.status(400).send({
            message: `required parameter missing`,
        });
        return;
    }

    // hit the main server of facebook with accessToken to get
    // user data & verify that user is authenticated user of facebook

    const user = await axios.get(
        `https://graph.facebook.com/v14.0/me?fields=id,first_name,last_name,email,picture&access_token=${accessToken}`
    );

    console.log("user : ", user);

    // here you will get user facebook data save it
    // in your database with provider name and give
    // him a JWT token and send useData in response

    res.send({
        message: "facebook login successfull",
        profile: user,
    });
});

// google login
router.post("/api/v1/google-login", async(req, res, next) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        res.status(400).send({
            message: `required parameter missing`,
        });
        return;
    }

    // hit the main server of google with accessToken to get
    // user data & verify that user is authenticated user of google

    const user = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: accessToken },
        }
    );

    console.log("user : ", user);

    // here you will get user data save it
    // in your database with provider name and give
    // him a JWT token and send useData in response

    res.send({
        message: "google login successfull",
        profile: user,
    });
});

export default router;