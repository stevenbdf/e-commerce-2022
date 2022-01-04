const handler = require('serverless-express/handler')
const app = require('./src/app')

module.exports.handler = handler(app)
