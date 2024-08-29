const jwt = require("jsonwebtoken");

const generateJWT = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = generateJWT;
