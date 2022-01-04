const client = require('./index');

const TABLE_NAME = 'e-commerce-2022-users';

const createUser = async (user) => {
  const params = {
    TableName: TABLE_NAME,
    Item: user,
  };

  const data = await client.put(params).promise();

  return data;
}

const getUser = async (username) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      username: username,
    },
  };

  const data = await client.get(params).promise();
  return data;
};

module.exports = {
  createUser,
  getUser
};