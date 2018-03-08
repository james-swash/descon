$(document).ready(function() {
	const electron = require('electron')
	const {remote} = require('electron')
	var win = remote.getCurrentWindow();
	// Listen for the Off checkbox being clicked
	$("#off").on('click', () => {
		win.close();
		console.log('window is closed')
		})
	})