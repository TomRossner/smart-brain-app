const {User} = require("../models/models");
const {
    checkUserPassword,
    storeUserPassword
} = require("../bcrypt");


// Utility functions

const getAllUsers = async () => {
    return await User.find({});
}

const getUserById = async (id) => {
    return await User.findOne({_id: id});
}

const getUserByEmail = async (email) => {
    return await User.findOne({email: email});
}



// Controller functions

const addNewUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const isUserAlreadyRegistered = await getUserByEmail(email);
        if (isUserAlreadyRegistered) return res.status(400).send("User already registered");
        else {
            const newUser = new User({name, email, imgUrl: "", predictions: 0});
            await newUser.save();
            const user = await getUserById(newUser._id);
            storeUserPassword(user._id, password, 10);
            res.status(200).send(user);
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    console.log(req.body)
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email}).select({password: 0, _id: 0});
        const userHash = await User.findOne({email: user.email}).select({_id: 0, password: 1});
        const isPasswordValid = await checkUserPassword(password, userHash.password);
        if (user && isPasswordValid) return res.status(200).send(user);
        else return res.status(400).send("User not found");
    } catch (error) {
        console.log(error);
    }
}

const addPrediction = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await getUserById(id);
        const updatedUser = await User.updateOne({_id: user._id}, {
            $set: {
                predictions: user.predictions + 1
            }
        })
        return res.status(200).send(updatedUser);
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const {email} = req.params;
        const {name, password, predictions, imgUrl} = req.body;
        const updatedUser = await User.updateOne({email: email}, {
            $set: {
                name,
                email,
                predictions,
                imgUrl
            }
        });
        // await storeUserPassword(id, password, 10);
        res.status(200).send(updatedUser);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    addNewUser,
    login,
    updateUser,
    addPrediction
}