const { inquiryMail } = require("../../auth/mailer");
const Query = require("../../module/query");

exports.CreateQuery = async (req, res) => {
  try {
    const query = await Query.create(req.body);

    inquiryMail(req.body).catch(console.error);

    // query.save();

    res.status(200).json({
      isSuccess: true,
      message:
        "your query is send to the Astrologer we give you the response as soon as possible",
      // mail,
    });
  } catch (error) {
    res.status(400).json({ isSuccess: false, error });
  }
};
