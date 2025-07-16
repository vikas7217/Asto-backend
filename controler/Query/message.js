const { Mail } = require("../../auth/mailer");

exports.Message = async (req, res) => {
  try {
    const { name, email, message, isClient } = req.body;

    Mail(req.body).catch(console.error);

    res
      .status(200)
      .json({ isSuccess: true, message: "your message has been sente" });
  } catch (error) {
    res
      .status(400)
      .json({ isSuccess: true, message: "your message has been sente" });
  }
};
