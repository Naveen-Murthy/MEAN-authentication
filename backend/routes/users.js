import express from "express";
import {
    User,
    addUser
} from "../models/user";

const users = express.Router();

// Registration Endpoint
users.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to register user.",
            });
        } else {
            res.json({
                success: true,
                msg: "User registered successfully",
            });
        }
    });
});

// Authentication Endpoint
users.post("/authentication", (req, res, next) => {
    res.send("Authentication");
});

// Profile Endpoint
users.get("/profile", (req, res, next) => {
    res.send("Profile");
});

export default users;