const jwt = require("jsonwebtoken");
const _ = require('lodash');
const { getUser } = require('../services/dynamo/users');

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access denied." });

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;

    const user = await getUser(req.user.uuid);

    if (_.isEmpty(user)) {
      return res.status(401).json({ error: "User does not exist" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};