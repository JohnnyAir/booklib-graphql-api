const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ============= query  ======================

const getMyProfile = (_, args, context) => {
  return context.auth.currentUser;
};

// ============= mutations ====================

const createUser = async (_, args) => {
  const { name, password, email } = args;
  password_hash = await bcrypt.hash(password, 10);
  const user = new User({
    name: name,
    email: email,
    password: password_hash
  });
  const newUser = await user.save();
  newUser.token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "24h"
    }
  );
  return newUser;
};

const login = async (_, args) => {
  try {
    const { password, email } = args;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Email!");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("wrong password!");
    }
    user.token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" }
    );
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const changeProfileName = async (_, args, context) => {
  const { name } = args;
  return await User.updateOne({ _id: context.auth.currentUser.id }, { name });
};

const changePassword = async (_, args, context) => {
  const { current_password, new_password, confirm_new_password } = args;
  const { password } = User.findById(context.auth.currentUser.id);
  if (new_password !== confirm_new_password) {
    throw new Error("passwords does not match!");
  }
  const match = await bcrypt.compare(current_password, password);
  if (!match) {
    throw new Error("wrong password!");
  }
  const new_password_hash = await bcrypt.hash(new_password, 10);
  return await User.updateOne(
    { _id: context.auth.currentUser.id },
    { password: new_password_hash }
  );
};

module.exports = {
  login,
  createUser,
  getMyProfile,
  changePassword,
  changeProfileName
};
