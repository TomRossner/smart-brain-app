const express = require("express");
const Router = express.Router();
const {
    getAllUsers,
    addNewUser,
    login,
    updateUser,
    addPrediction,
    // loginWithGoogle
} = require("./users.controller");

Router.get('/users', getAllUsers);

Router.post('/users', addNewUser);

Router.post("/login", login);

// Router.post("/google-login", loginWithGoogle);

Router.put("/update-predictions/:id", addPrediction);

Router.put("/update-user/:email", updateUser);

module.exports = Router;