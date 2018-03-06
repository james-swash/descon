$(document).ready(function() {
	const electron = require('electron')
	// Listen for the Off checkbox being clicked
	$("#off").on('click', () => {
		alert("Are you sure you want to shutdown?")
		})
	})