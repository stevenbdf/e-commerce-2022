var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const authSchemas = require('./validations/auth');
const { validate } = require('./validations');
const authJWT = require('../middlewares/auth');

router.post('/register', validate(authSchemas.register), authController.register);

router.post('/login', validate(authSchemas.login), authController.login);

router.get('/me', authJWT, authController.me);

module.exports = router;