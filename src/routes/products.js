var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('products');
});

module.exports = router;