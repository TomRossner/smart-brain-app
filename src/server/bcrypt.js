const bcrypt = require("bcryptjs");
const { User } = require("./models/models");

const storeUserPassword = async (email ,password, salt) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    storeHashInDatabase(email, hashedPassword);
}

const storeHashInDatabase = async (email, hash) => {
    const userSavedWithHash = await User.updateOne({email: email}, {
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