const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String},  
    email: {type: String},  
    password: {type: String},  
    predictions: {type: Number},
    created_at: {type: Date, default: Date.now()},
    imgUrl: {type: String}
},
{collection: "users"})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}