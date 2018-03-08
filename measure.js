$(document).ready(function() {
    const electron = require('electron')
    const {remote} = require('electron')
	var win = remote.getCurrentWindow()   
   
    $(".menu").hide();

    $(".toggleMenu").on('click', () => {
        $(".menu").toggle()
         $(".submenu").hide()
        $("#screenshot").on('click', () => {
            alert("Are you sure you want to take a screenshot?")
        })
    })


    $("#off").on('click', () => {
		win.close()
		})

    function display() {
        var count = count || 1;

        for(var i = 0; i < count; i++) {
            var i = Math.random() * 12;
            i = Math.round(i * 1000) / 1000
            
            $("h1").text('± '+i+' mV')
        }
    }
    
    setInterval(display(), 3000);


})