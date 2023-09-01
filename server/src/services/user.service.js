const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { comparePassword, hashPassword } = require("../utils/common");
const { generateToken } = require("../utils/jwt");

const register = async ({ email, password, fullName }) => {
  // check existing user
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error("user already exists");

  password = await hashPassword(password);

  await User.create({ email, password , fullName});
};

const login = async (data) => {
  const { username, password } = data;
  const user = await getUserByEmail(username);
  if (!user) throw new Error("User not found");

  const result = await comparePassword(password, user.password);
  if (!result) throw new Error("Password does not match");

  const token = await generateToken({
    email: user.email,
    id: user._id,
  });

  return { token, userId: user.id };
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

 const getAllUser = async (req, res) => {
  const users = await User.find();
  return  users;
 };

 const getUserById = async (id) => {
  console.log(id);
  return User.findById(id);
 };
 


module.exports = {
  register,
  login,
  getAllUser,
  getUserById,
};
