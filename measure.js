$(document).ready(function() {
    const electron = require('electron')
   
    $(".menu").hide();

    $(".toggleMenu").on('click', () => {
        $(".menu").slideToggle(1500);
         $(".submenu").hide();
        $("#screenshot").on('click', () => {
            alert("Are you sure you want to take a screenshot?")
        })
        $("#mode").on('click', () => {
            $(".submenu").slideToggle(1500);
        })
    })


    $("#off").on('click', () => {
		alert("Are you sure you want to shutdown?")
		})

    var count = count || 1;

    for(var i = 0; i < count; i++) {
        var i = Math.random() * 12;
        i = Math.round(i * 1000) / 1000
        
        $("h1").text('± '+i+' mV')
    }


})