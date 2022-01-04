const express = require('serverless-express/express');
var app = express();
const router = require('./routes');

// add json parser
app.use(express.json());

router.init(app);

module.exports = app;
