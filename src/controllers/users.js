const { updateUser, getUser, getUserByEmail } = require('../services/dynamo/users')
const _ = require('lodash');

const update = async (req, res) => {
  if (req.user.uuid !== req.params.uuid) {
    return res.status(401).json({
      error: 'Unauthorized. You are not allowed to update this user'
    });
  }

  let user = await getUser(req.user.uuid);
  user = user.Item;

  if (_.isEmpty(user)) {
    return res.status(409).json({
      error: 'User does not exist'
    });
  }

  if (req.body?.email && req.body.email !== user.email) {
    const emailExists = await getUserByEmail(req.body.email);

    if (!_.isEmpty(emailExists.Items[0])) {
      return res.status(409).json({
        error: 'Email is already in use'
      });
    }
  }

  const updatedUser = await updateUser({
    uuid: req.user.uuid,
    email: req.body?.email ? req.body.email : req.user.email,
    data: JSON.stringify({ ...JSON.parse(user.data), ...req.body }),
  });

  req.user = { ...JSON.parse(updatedUser.Attributes.data) };

  return res.status(200).json({
    data: {
      user: req.user
    }
  })
};

module.exports = {
  update
};