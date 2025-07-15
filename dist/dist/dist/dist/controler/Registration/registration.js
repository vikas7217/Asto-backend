const User = require("../../module/registration.js");
exports.CreateRegis = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    contactNumber
  } = req.body;
  console.log(req.body);
  try {
    const isEmailExist = await User.findOne({
      email
    });
    if (isEmailExist) {
      return res.status(400).json({
        isSuccess: false,
        message: "Email is already taken"
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      contactNumber
    });
    res.status(200).json({
      isSuccess: true,
      message: "User created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Server error",
      error: error.message
    });
  }
};
exports.GetAll = async (req, res) => {
  try {
    const search = req.query || "";
    const data = User.find(search);
    res.status(200).json({
      isSuccess: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      error: error.message
    });
  }
};