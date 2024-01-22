const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt-async");
const { SECRET } = require("../constants");
const { loadErrorMessages } = require("../utils/errorParser");

exports.loadUsers = async () => {
  try {
    const users = User.find();
    return users;
  } catch (error) {
    throw new Error("Error loading users!");
  }
};

exports.register = async (userData) => {
  try {
    const user = await User.create(userData);
    const data = {
      _id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(data, SECRET, { expiresIn: "1d" });
    return { user, token };
  } catch (error) {
    throw loadErrorMessages(error);
  }
};

exports.login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  if (!user) {
    throw "Username or password is invalid";
  }
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    throw "Username or password is invalid";
  }

  const data = {
    _id: user._id,
    email: user.email,
  };
  const token = await jwt.sign(data, SECRET, { expiresIn: "1d" });
  return { user, token };
};
exports.findByToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, SECRET);
    
    let user = await User.findById(decodedToken._id);
    
    return user;
  } catch (error) {
    return null;
  }
};
