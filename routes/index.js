"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Team42 Monitoring' });
});


router.get('/metrics', function(expressRequest, expressResponse, next) {
	var http = require('follow-redirects').http;
	var url = "http://52.24.23.194/metrics";

	http.get(url, function(httpResponse) {
		var data = '';

		httpResponse.on('data', function (chunk) {
			data += chunk;
		});

		httpResponse.on('end', function () {
			expressResponse.json(data);
		});

	})
	.on('error', function(e) {
		console.log("Error when calling external metrics site %s: %s", url, e.message);
		expressResponse.json({status: false, statusMessage: e.message});
	});
});


module.exports = router;
