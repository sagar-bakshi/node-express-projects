const CustomAPIError = require("../errors/custom-error.js");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide username or password", 400);
  }
  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  if (!req.user) {
    throw new CustomAPIError("Not Authorized to this route", 401);
  }
  res
    .status(200)
    .json({ msg: `Welcome to ${req.user.username}`, secret: req.user.id });
};

module.exports = {
  login,
  dashboard,
};
