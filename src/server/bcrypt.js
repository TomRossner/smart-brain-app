const bcrypt = require("bcryptjs");
const { User } = require("./models/models");

const storeUserPassword = async (id ,password, salt) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    storeHashInDatabase(id, hashedPassword);
}

const storeHashInDatabase = async (id, hash) => {  
    const user = await User.findById(id);
    const userSavedWithHash = await User.updateOne({_id : user._id}, {
        $set: {
            password: hash
        }
    })
    return userSavedWithHash;
}

// Returns true if user password is correct, returns false otherwise
const checkUserPassword = (enteredPassword, storedPasswordHash) => {
    return bcrypt.compare(enteredPassword, storedPasswordHash);
}

module.exports = {
    storeUserPassword,
    checkUserPassword
}