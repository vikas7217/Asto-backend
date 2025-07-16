const jwt = require("jsonwebtoken");

exports.Authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "invalid Access token" });
    }
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const timeNow = Math.floor(Date.now() / 1000);

    if (decode.exp < timeNow) {
      res.status(401).json({ isSuccess: false, message: "Token expire" });
    }

    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { Authenticate };
