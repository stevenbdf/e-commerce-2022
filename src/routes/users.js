var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const userSchemas = require('./validations/users');
const { validate } = require('./validations');
const authJWT = require('../middlewares/auth');

router.put('/:uuid', [authJWT, validate(userSchemas.update)], userController.update);

module.exports = router;