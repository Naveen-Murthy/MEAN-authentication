import express from "express";
import {
    User,
    addUser,
    getUserByUserName,
    comparePassword
} from "../models/user";
import jwt from 'jsonwebtoken';
import { config } from "../config/main-config";
import passport from 'passport';

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
    const username=req.body.username;
    const password= req.body.password;

    getUserByUserName(username, (err, user)=>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({
                success:false,
                msg: "User not found" 
            })
        }else{
            comparePassword(password, user.password , (err, isMatch)=>{
                if(err){
                    throw err;
                }
                if(isMatch){
                    const token = jwt.sign({user}, config.passport.secret, {
                        expiresIn: config.passport.expiresIn,
                    });

                    return res.json({
                        success:true,
                        token: token,
                        user:{
                            id:user._id,
                            name: user.name,
                            username:user.username,
                            email: user.email
                        }
                    })
                }else{
                    return res.json({
                        success:false,
                        msg: "Wrong password."
                    })
                }
            })
        }
    })
});

// Profile Endpoint
users.get("/profile", passport.authenticate('jwt', { session: false }) , (req, res, next) => {
    console.log(req)
    res.json({
        user: req.user
    })
});

export default users;