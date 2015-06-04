// Creation Date: 2015.06.04
// Author: Fernando L. Canizo - http://flc.muriandre.com/

"use strict";

// Our global namespace
var mdtp = {};

function getStatus() {
	$.ajax({
		url: '/metrics',
		dataType: 'json',
		timeout: 13000,

		success: function (data) {
			console.log(data);
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
//	mdtp.intervalId = setInterval(getStatus, 5000);
	getStatus();
});
