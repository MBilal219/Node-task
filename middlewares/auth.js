const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Verify token is missing" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid token" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = auth;
