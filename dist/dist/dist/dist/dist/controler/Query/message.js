const {
  Mail
} = require("../../auth/mailer");
exports.Message = async (req, res) => {
  try {
    const {
      name,
      email,
      message,
      isClient
    } = req.body;
    const mail = await Mail(req.body);
    res.status(200).json({
      isSuccess: true,
      message: 'your message has been sente',
      mail
    });
  } catch (error) {
    res.status(400).json({
      isSuccess: true,
      message: 'your message has been sente'
    });
  }
};