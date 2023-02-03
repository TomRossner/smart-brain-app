const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();


const setJwt = (id) => {
    const token = jwt.sign({id}, process.env.JWT_PRIVATE_KEY);
    return token;
}

module.exports = {
    setJwt
}