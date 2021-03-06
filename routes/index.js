"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Team42 Monitoring' });
});


router.get('/metrics', function(expressRequest, expressResponse, next) {
	// Should receive a JSON object like this:
	// {"AuthenticationCallsPerSecond": 18, "WebServiceCallsPerSecond": 11}

	var http = require('follow-redirects').http;
	var url = "http://52.24.23.194/metrics";

	http.get(url, function(httpResponse) {
		var data = '';

		httpResponse.on('data', function (chunk) {
			data += chunk;
		});

		httpResponse.on('end', function () {
			var obj = JSON.parse(data);
			// append status
			obj.status = true;
			expressResponse.json(obj);
		});

	})
	.on('error', function(e) {
		console.log("Error when calling external metrics site %s: %s", url, e.message);
		expressResponse.json({
			status: false,
			statusMessage: e.message,
			AuthenticationCallsPerSecond: '----',
			WebServiceCallsPerSecond: '----'
			});
	});
});


module.exports = router;
