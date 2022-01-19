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

const getUser = async (uuid) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      uuid
    },
  };

  const data = await client.get(params).promise();
  return data;
};

const getUserByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  const data = await client.query(params).promise();
  return data;
};

const updateUser = async (user) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      uuid: user.uuid,
    },
    UpdateExpression: 'set #data = :data, #email = :email',
    ExpressionAttributeNames: {
      '#data': 'data',
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':data': user.data,
      ':email': user.email,
    },
    ReturnValues: 'ALL_NEW',
  };

  const data = await client.update(params).promise();

  return data;
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserByEmail
};