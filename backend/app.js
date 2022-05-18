import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import users from "./routes/users";
import Database from "./config/database";

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
const db = new Database();
mongoose.connect(db.database);

// To on db 
mongoose.connection.on('connected', () => {
    console.log("Connected to db " + db.database);
})

// To check errors in db connections 
mongoose.connection.on('error', (err) => {
    console.log("Db error " + err);
})

// Accessing users endpoints
app.use("/users", users);

// Index Route
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

// Starting Server 
app.listen(port, () => {
    console.log("Server started at " + port);
})