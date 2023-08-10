const httpStatus = require("http-status");
const {User} = require("../models");
const ApiError = require("../utils/ApiError");
const {comparePassword, hashPassword} = require("../utils/common");
const {generateToken} = require("../utils/jwt");

const register = async (data) => {
    const {email} = data;

    // check existing user
    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new Error("user already exists");

    data.password = await hashPassword(data.password);

    return User.create(data);
};

const login = async (data) => {
    const {username, password} = data;
    const user = await getUserByEmail(username);
    if (!user) throw new Error("User not found");

    const result = await comparePassword(password, user.password);
    if (!result) throw new Error("Password does not match");

    const token = await generateToken({
        email: user.email,
        id: user._id,
    });

    return {token};
};

const getUserByEmail = async (email) => {
    return User.findOne({email});
};

module.exports = {
    register,
    login,
};
