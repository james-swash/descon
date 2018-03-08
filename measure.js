$(document).ready(function() {
    const electron = require('electron')
    const {remote} = require('electron')
    var win = remote.getCurrentWindow()   
    
    var unit = 'V'
    var range = 'm'
    var hold = false;
    function menu() {

        $(".menu").hide()

        $(".toggleMenu").on('click', () => {
            $(".menu").slideToggle(1500)
            $(".modemenu").hide(300)
            $(".rangemenu").hide(300)
            $("#mode").on('click', function() {
                $('.modemenu').toggle(1000)
                $('.rangemenu').hide()
            })
            $("#range").on('click', function() {
                $('.modemenu').hide()
                $('.rangemenu').toggle(1000)
            })
            $("#screenshot").on('click', () => {
                alert("Are you sure you want to take a screenshot?")
            })
        })

    }

    function getMode() {
        $("#voltage").on('click', function(e) {
            unit = 'V'
            $('.modemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #unitvalue").text(unit)
        })
        $("#current").on('click', function(e) {
            unit = 'A'
            $('.modemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #unitvalue").text(unit)
        })
        $("#resistance").on('click', function(e) {
            unit = 'R'
            $('.modemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #unitvalue").text(unit)
        })
        
    }

    function getRange() {
        $('#mega').on('click', function(e) {
            range = 'M'
            $('.rangemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #rangevalue").text(range)
        })
        $('#kilo').on('click', function(e) {
            range = 'k'
            $('.rangemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #rangevalue").text(range)
        })
        $('#none').on('click', function(e) {
            range = ''
            $('.rangemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #rangevalue").text(range)
        })
        $('#milli').on('click', function(e) {
            range = 'm'
            $('.rangemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #rangevalue").text(range)
        })
        $('#micro').on('click', function(e) {
            range = 'u'
            $('.rangemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #rangevalue").text(range)
        })
        $('#nano').on('click', function(e) {
            range = 'n'
            $('.rangemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #rangevalue").text(range)
        })
        $('#pico').on('click', function(e) {
            range = 'p'
            $('.rangemenu').toggle(300)
            $('.menu').toggle(300)
            $("h1 #rangevalue").text(range)
        })

    }

    function turnOff() {
        $("#off").on('click', () => {
            if(confirm("Are you sure you want to exit the application?")){
                win.close();
                }
            })
    }

    
    function display() {
        var i = Math.random() * 12;
        i = Math.round(i * 1000) / 1000
            
        $("h1 #value").text(i)
    }

    function msg2Board(unit, range) {
        var mode;
        switch(unit) {
            case 'V':
                mode = "VOLTage:"
                break
            case 'A':
                mode = "CURRent:"
                break
            case 'R':
                mode = "RESIstance"
                break
                
        }
        return "MEASure:"+mode
    }

    function holdDisplay(displayID) {
        $('#hold').on('click', function(e) {
            if (hold) {
                hold = false
                clearInterval(displayID)
                var newDisplay = setInterval(function(){display()}, 1000)
                return newDisplay
            }
            else {
                hold = true
                clearInterval(displayID)
                return null
            }
            console.log(hold)
        })
        
    }


    var runDisplay = setInterval(function(){display()}, 1000)
    turnOff()
    menu()
    getMode()
    getRange()
    setInterval(function(){msg2Board(unit)}, 1000)
    runDisplay = holdDisplay(runDisplay)

})