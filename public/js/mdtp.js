// Creation Date: 2015.06.04
// Author: Fernando L. Canizo - http://flc.muriandre.com/

"use strict";

// Our global namespace
var mdtp = {};

function display(data) {
	$('#web-service-calls').html(data.WebServiceCallsPerSecond);
	$('#authentication-calls').html(data.AuthenticationCallsPerSecond);
}


function getStatus() {
	$.ajax({
		url: '/metrics',
		dataType: 'json',
		timeout: 4000,

		success: function (data) {
			console.log(data);
			display(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}


////////////////////////////////////////////////////////////////////////////////
// main
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
	getStatus();
	mdtp.intervalId = setInterval(getStatus, 5000);
});
