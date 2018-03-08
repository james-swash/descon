$(document).ready(function() {
	const electron = require('electron')
	const {remote} = require('electron')
	var win = remote.getCurrentWindow();
	// Listen for the Off checkbox being clicked
	function turnoff() {
		$("#off").on('click', () => {
			if(confirm("Are you sure you want to exit the application?")){
				win.close();
				}
			})
	}
	
	turnoff()
	
	})