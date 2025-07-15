const Registration = require("../../module/registration");
const jwt = require('jsonwebtoken')

// Generate JWT with 2h expiry
const generateToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "2h",
  });
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  const isEmailExist = await Registration.findOne({ email: email });
  const isPasswordValid = await isEmailExist.matchPassword(password);

  if (!isEmailExist) {
    res
      .status(400)
      .json({
        isSuccess: false,
        message: "User dose not exist with this email",
      });
  }
  if (!isPasswordValid) {
    res.status(400).json({ isSuccess: false, message: "Invalid credential" });
  }

  const { regId } = isEmailExist;

  // Generate JWT with 2h expiry
  const token = generateToken(regId, email, password);

  res
    .status(200)
    .json({
      isSuccess: true,
      token: token,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
