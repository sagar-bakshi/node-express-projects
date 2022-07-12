const CustomAPIError = require("../errors/custom-error.js");
const jwt = require("jsonwebtoken");

const authenticationMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  console.log(token);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Please provide token", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new CustomAPIError("Not Authorized to this route", 401);
  }
};

module.exports = authenticationMiddleWare;
