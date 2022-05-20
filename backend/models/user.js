import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserSchema = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

let User = mongoose.model("User", UserSchema);

function addUser(newUser, callback) {
    bcryptjs.genSalt(16, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
            console.log(hash)
            if (err) {
                throw err;
            } else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}

function getUserById(id, callback) {
    User.findById(id, callback);
}

function getUserByEmail(email, callback) {
    const query = {
        email: email,
    };
    User.findOne(query, callback);
}

function comparePassword(enteredPassword, hash, callback) {
    bcryptjs.compare(enteredPassword, hash, (err, isMatch)=>{
        if(err){
            throw err;
        }
        callback(null, isMatch);
    })
}

export {
    User,
    addUser,
    getUserById,
    getUserByEmail,
    comparePassword
};