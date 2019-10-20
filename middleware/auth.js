const jwt = require("jsonwebtoken");

const validateAuth = resolver => (...args) => {
  if (!args[2].auth.isAuthenticated) {
    throw new Error(`Invalid authentication token`);
  }

  return resolver.apply(null, args);
};

const getUserFromAuthToken = (req, res, next) => {
  req.auth = {
    isAuthenticated: false,
    currentUser: null
  };
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.auth.isAuthenticated = true;
    req.auth.currentUser = user;
  } catch (error) {
    console.warn(`error verifying token: ${error}`);
  }
  next();
};

module.exports = {
  validateAuth,
  getUserFromAuthToken
};
