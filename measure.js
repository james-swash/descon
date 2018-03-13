const electron = require('electron')
const {remote} = require('electron')
var win = remote.getCurrentWindow()   
const html2canvas = require('html2canvas')
const reader = new FileReader();

myRe = new RegExp('(\-?\d+(\.\d+)?(E\d+)?)', 'i')
unit = 'V'
unitType = 'DC'
range = 'm'
hold = false
runInt = null
loggedData = new Array()
timeData = new Array()
unitData = new Array()
logDataFlag = 'N'

ws = new WebSocket("ws://localhost:8000");
    
ws.onopen = function()
{
    console.log("Connected to WS");
};

ws.onclose = function()
{ 
    console.log("Disconnected from WS");
};

function menu() {

    $(".menu").hide()
    $(".modemenu").hide()
    $(".rangemenu").hide()
    $(".acdcmenu").hide()

    $(".toggleMenu").on('click', () => {
        $(".menu").toggle()
        $("#mode").on('click', function() {
            $('.modemenu').show()
        })
        $("#range").on('click', function() {
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

function getUnitType() {
    $("#AC").on('click', function(e){
        unitType = 'AC'
        console.log(unitType)
        $(".attributes #acdc").text(unitType)
    })
    $("#DC").on('click', function(e){
        unitType = 'DC'
        $(".attributes #acdc").text(unitType)
        console.log(unitType)
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
        }
    )
}

function msg2Board() {
    var mode;
    switch(unit) {
        case 'V':
            mode = "VOLTage"
            break
        case 'A':
            mode = "CURRent"
            break
        case 'R':
            mode = "RESIstance"
            break       
    }
    return "MEASure:"+mode+':'+unitType+'?;'
}

function display() {

    var command = msg2Board()
    console.log(command);
    ws.send(command)

    ws.onmessage = function (evt) 
    { 
        
        reader.readAsText(evt.data)

        reader.onload = function() {

            var i = reader.result;
            var value = myRe.exec(i)
            console.log(value[0])

            console.log("Message received", i)

            $("h1 #value").text(value[0])

            if (logDataFlag === 'Y') {
                loggedData.push(i)
                timeData.push(timeNow())
                unitData.push(unit+' '+unitType)
                localStorage.setItem('storedData', JSON.stringify(loggedData))
                localStorage.setItem('timeData', JSON.stringify(timeData))
                localStorage.setItem('unitData', JSON.stringify(unitData))
                console.log(loggedData)
                console.log(timeData)
                console.log(unitData)
            }
            else if (logDataFlag === 'C') {
                localStorage.setItem('storedData', '')
                localStorage.setItem('timeData', '')
                localStorage.setItem('unitData', '')
            }
            else {
                loggedData = []
                timeData = []
                unitData = []
            }

        };            
        
    };
    
}

function timeNow() {
    var d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds()
    if (hr < 10) {
        hr = "0" + hr
    }
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    return hr+":"+min+":"+sec
  }

$(function() {

    $("#imgHolder").hide()

    $('#hold').on('click', function(e) {
        if (hold) {
            hold = false
            runInt = setInterval(function() {display(logDataFlag)}, 1000)
        }
        else {
            hold = true
            clearInterval(runInt)
        }
    })

    $("#record").on('click', () => {
        
        if (logDataFlag === 'Y') {
            logDataFlag = 'N'
            $("#imgHolder").hide()
        }
        else if (logDataFlag === 'C') {
            logDataFlag = 'N'
            $("#imgHolder").hide()
        }
        else {
            logDataFlag = 'Y'
            $("#imgHolder").show()
        }
    })

    $("#clearlog").on('click', () => {
        logDataFlag = 'C'
    })
        
    runInt = setInterval(display, 1000)

    turnOff()
    menu()
    getMode()
    getUnitType()
    getRange()
    screenShot()
    setInterval(msg2Board, 1000)
    
})