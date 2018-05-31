var express = require('express');
//var ctrlA = require('../controllers/announcement');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
