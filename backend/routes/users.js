import express from "express";
import {
    User,
    addUser,
    getUserByEmail,
    comparePassword,
    updateDetails
} from "../models/user";
import jwt from 'jsonwebtoken';
import { config } from "../config/main-config";
import passport from 'passport';

const users = express.Router();

// Registration Endpoint
users.post("/register", (req, res, next) => {
    getUserByEmail(req.body.email, (err, user)=>{
        if(err){
            throw err;
        }
        if(!user){
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            });
            addUser(newUser, (err, user) => {
                if (err) {
                    res.json({
                        status: false,
                        msg: "Failed to register user.",
                    });
                    return next(err);
                } else {
                    res.json({
                        status: true,
                        msg: "User registered successfully",
                    });
                }
            });
        }else{
            return res.json({
                status:false,
                msg: "User was already registered" 
            })
        }
    })
});

// Authentication Endpoint
users.post("/authentication", (req, res, next) => {
    const email=req.body.email;
    const password= req.body.password;

    getUserByEmail(email, (err, user)=>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({
                status:false,
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
                        status:true,
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
                        status:false,
                        msg: "Wrong password."
                    })
                }
            })
        }
    })
});

// Update Profile Endpoint
users.post("/profileupdate", (req, res, next) => {
    // create a document that sets the plot of the movie
    const details = {
      $set: {
        profile_pic: req.body.profile_pic
      },
    };
    updateDetails(req.body.email, details, (err, user)=>{
        if(err){
        throw err;
        }
        if(user){
            return res.json({
                status:true,
                msg: "User details updated successfully" 
            })
        }else{
            return res.json({
                status:false,
                msg: "User was not registered" 
            })
        }
    })
});

// Profile Endpoint
users.get("/profile", passport.authenticate('jwt', { session: false }) , (req, res, next) => {
    res.json({
        status: true,
        user: req.user
    })
});

export default users;