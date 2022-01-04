var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const authSchemas = require('./validations/auth');
const { validate } = require('./validations');

router.post('/register', validate(authSchemas.register), authController.register);

router.post('/login', authController.login);

router.get('/me', authController.me);

module.exports = router;