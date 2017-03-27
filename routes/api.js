var express = require('express');
var router = express.Router();
var apiController = require('../controllers/api');

/* GET home page. */
router.get('/users', apiController.getUsers);

module.exports = router;
