$(document).ready(function() {
    const electron = require('electron')
    const {remote} = require('electron')
    var win = remote.getCurrentWindow()   
    const html2canvas = require('html2canvas')
    
    var unit = 'V'
    var range = 'm'
    var hold = false

    var runInt

    function menu() {

        $(".menu").hide()

        $(".toggleMenu").on('click', () => {
            $(".menu").toggle()
            $(".modemenu").hide()
            $(".rangemenu").hide()
            $("#mode").on('click', function() {
                $('.modemenu').toggle()
                $('.rangemenu').hide()
            })
            $("#range").on('click', function() {
                $('.modemenu').hide()
                $('.rangemenu').toggle()
            })
        })

    }

    function getMode() {
        $("#voltage").on('click', function(e) {
            unit = 'V'
            $('.modemenu').toggle()
            $('.menu').toggle()
            $("h1 #unitvalue").text(unit)
        })
        $("#current").on('click', function(e) {
            unit = 'A'
            $('.modemenu').toggle()
            $('.menu').toggle()
            $("h1 #unitvalue").text(unit)
        })
        $("#resistance").on('click', function(e) {
            unit = 'R'
            $('.modemenu').toggle()
            $('.menu').toggle()
            $("h1 #unitvalue").text(unit)
        })
        
    }

    function getRange() {
        $('#mega').on('click', function(e) {
            range = 'M'
            $('.rangemenu').toggle()
            $('.menu').toggle()
            $("h1 #rangevalue").text(range)
        })
        $('#kilo').on('click', function(e) {
            range = 'k'
            $('.rangemenu').toggle()
            $('.menu').toggle()
            $("h1 #rangevalue").text(range)
        })
        $('#none').on('click', function(e) {
            range = ''
            $('.rangemenu').toggle()
            $('.menu').toggle()
            $("h1 #rangevalue").text(range)
        })
        $('#milli').on('click', function(e) {
            range = 'm'
            $('.rangemenu').toggle()
            $('.menu').toggle()
            $("h1 #rangevalue").text(range)
        })
        $('#micro').on('click', function(e) {
            range = 'u'
            $('.rangemenu').toggle()
            $('.menu').toggle()
            $("h1 #rangevalue").text(range)
        })
        $('#nano').on('click', function(e) {
            range = 'n'
            $('.rangemenu').toggle()
            $('.menu').toggle()
            $("h1 #rangevalue").text(range)
        })
        $('#pico').on('click', function(e) {
            range = 'p'
            $('.rangemenu').toggle()
            $('.menu').toggle()
            $("h1 #rangevalue").text(range)
        })

    }

    function screenShot() {
        $('#screenshot').on('click', function(e) {
            if(confirm("Are you sure you wish to take a screenshot?")){
                html2canvas(document.body).then(function(canvas) {
                    document.body.appendChild(canvas);
                });
            }
        })
    }

    function turnOff() {
        $("#off").on('click', () => {
            if(confirm("Are you sure you want to exit the application?")){
                win.close()
                }
            })
    }

    
    function display() {
        var i = Math.random() * 12
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


    $('#hold').on('click', function(e) {
        if (hold) {
            hold = false
            runInt = setInterval(display, 1000)
        }
        else {
            hold = true
            clearInterval(runInt)
        }
    })
        
    runInt = setInterval(display, 1000)

    turnOff()
    menu()
    getMode()
    getRange()
    screenShot()
    setInterval(function(){msg2Board(unit)}, 1000)

})