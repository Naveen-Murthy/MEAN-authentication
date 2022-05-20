import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import users from "./routes/users";
import passport from 'passport';
import { config } from "./config/main-config";
import { applyPassportStrategy } from "./config/passport";

const app = express();

// Port number
const port = 4000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Mondo Db Connection 
mongoose.connect(config.env.mongoDBUri);

// To on db 
mongoose.connection.on('connected', () => {
    console.log("Connected to db " + config.env.mongoDBUri);
})

// To check errors in db connections 
mongoose.connection.on('error', (err) => {
    console.log("Db error " + err);
})

// Passport Middleware (For Authtication)
applyPassportStrategy(passport);

// Accessing users endpoints
app.use("/users", users);

// Index Route
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Starting Server 
app.listen(port, () => {
    console.log("Server started at " + port);
})