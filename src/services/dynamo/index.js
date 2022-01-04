const AWS = require('../aws');

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoClient;