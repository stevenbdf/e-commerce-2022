const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../services/dynamo/users')
const _ = require('lodash');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
  try {
    let emailExists = await getUserByEmail(req.body.email);

    if (!_.isEmpty(emailExists.Items[0])) {
      return res.status(409).json({
        error: 'Email is already in use.'
      });
    }

    const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));

    const uuid = uuidv4();

    let user = {
      uuid,
      email: req.body.email,
      password: req.body.password
    };

    user.password = bcrypt.hashSync(user.password, salt);
    user.data = JSON.stringify({ uuid, ...req.body, password: undefined });

    await createUser(user);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const login = async (req, res) => {
  let user = await getUserByEmail(req.body.email);

  if (_.isEmpty(user.Items[0])) {
    return res.status(409).json({
      error: "User doesn't exist"
    });
  }

  user = user.Items[0];

  const validPassword = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!validPassword) {
    return res.status(401).json({
      error: "Invalid password"
    });
  }

  const token = jwt.sign(JSON.parse(user.data), process.env.JWT_PRIVATE_KEY);

  return res.status(200).json({
    data: {
      token
    }
  });
};

const me = (req, res) => {
  return res.status(200).json({
    data: {
      user: req.user
    }
  })
};

module.exports = {
  register,
  login,
  me
};