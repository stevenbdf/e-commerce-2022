const bcrypt = require('bcrypt');
const { getUser, createUser } = require('../services/dynamo/users')
const _ = require('lodash');

const register = async (req, res) => {
  try {
    const userExists = await getUser(req.body.email);

    if (!_.isEmpty(userExists)) {
      return res.status(409).json({
        error: 'User already exists'
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));

    let user = {
      username: req.body.email,
      password: req.body.password
    };

    user.password = await bcrypt.hash(user.password, salt);
    user.data = JSON.stringify({ ...req.body, password: undefined });

    await createUser(user);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const login = (req, res) => {
  res.send('login');
};

const me = (req, res) => {
  res.send('me');
};

module.exports = {
  register,
  login,
  me
};