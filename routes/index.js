"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Metrics Dashboard Test Project' });
});

module.exports = router;
