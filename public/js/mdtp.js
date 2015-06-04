// Creation Date: 2015.06.04
// Author: Fernando L. Canizo - http://flc.muriandre.com/

"use strict";

// Our global namespace
var mdtp = {};


function display(data) {
	// Shows new data with cool animations

	var prevWebServiceCalls = $('#web-service-calls').text();
	var prevAuthenticationCalls = $('#authentication-calls').text();

	// Animate the elements' value
	$({
		webServiceCalls: prevWebServiceCalls,
		authenticationCalls: prevAuthenticationCalls

	}).animate({
		webServiceCalls: data.WebServiceCallsPerSecond,
		authenticationCalls: data.AuthenticationCallsPerSecond
	}, {
		duration: 300,
		easing: 'swing',
		step: function () { // called on every step
			// ensure to put dashes instead of NaN
			var ws = Math.round(this.webServiceCalls);
			ws = isNaN(ws)? '----' : ws;
			var a = Math.round(this.authenticationCalls);
			a = isNaN(a)? '----' : a;

			// Update elements
			$('#web-service-calls').text(ws);
			$('#authentication-calls').text(a);
		},
		start: function () {
			// show clear white icons once fully updated
			$('.glyphicon').removeClass('glyphicon-animated');
		},
		complete: function () {
			// Animate icons to indicate value aging
			// Start white and get black
			$('.glyphicon').addClass('glyphicon-animated');
		}
	});
}


function getStatus() {
	// polls new data from source

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
