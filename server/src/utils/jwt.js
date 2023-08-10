const jwt = require("jsonwebtoken");
const {jwt: jwtConfig} = require("../config");

const generateToken = async (data) => {
    try {
        return jwt.sign(data, jwtConfig.secret, {
            expiresIn: jwtConfig.accessExpirationMinutes * 60,
        });
    } catch (error) {
        throw new Error("Some error occurred");
    }
};

const verifyToken = async (req, token) => {
    try {
        req.user = await jwt.verify(token, jwtConfig.secret);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
