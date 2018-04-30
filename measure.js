const electron = require('electron')
const {remote} = require('electron')
const Websocket = require('./websocket')
var win = remote.getCurrentWindow()
const html2canvas = require('html2canvas')
const parseEng = require('parse-eng')

const ws = new Websocket(true);

myRe = new RegExp(/^.*\s(.*)\n$/, 'i')
unit = 'V'
unitType = 'DC'
// range = ''
hold = false
runInt = null
loggedData = new Array()
timeData = new Array()
unitData = new Array()
logDataFlag = 'N'
commandMsg = 'MEASure:VOLTage:DC?;'
rangeVal = 0

function menu() {

    $(".modemenu").hide()
    $(".rangemenu").hide()
    $(".acdcmenu").hide()
    $('#continuity').hide()
	$("#mode").on('click', function() {
		$('.modemenu').toggle()
	})
	$("#range").on('click', function() {
		$('.rangemenu').toggle()
	})

}

function getMode() {
    $("#voltage_AC").on('click', function(e) {
        unit = 'V'
        unitType = 'AC'
        $('.modemenu').toggle()
        $("h1 #unitvalue").text(unit)
        $(".attributes #acdc").text('AC')
        $(".rangemenu #zero").text('-10 to 10 V')
        $(".rangemenu #one").text('-1 to 1 V')
        $(".rangemenu #two").text('-100 to 100 mV')
        $("#continuity").hide();
        switch(rangeVal) {
            case 0:
                $(".attributes #autorange").text('Voltage | 0 to 10 V')
                break
            case 1:
                $(".attributes #autorange").text('Voltage | 0 to 1 V')
                break
            case 2:
                $(".attributes #autorange").text('Voltage | 0 to 100 mV')
                break       
            case 3:
                $(".attributes #autorange").text('Voltage | Auto')
                break       
        }
        commandMsg = 'MEASure:VOLTage:AC?;'
    })
    $("#voltage_DC").on('click', function(e) {
        unit = 'V'
        unitType = 'DC'
        $('.modemenu').toggle()
        $("h1 #unitvalue").text(unit)
        $(".attributes #acdc").text('DC')
        $(".rangemenu #zero").text('-10 to 10 V')
        $(".rangemenu #one").text('-1 to 1 V')
        $(".rangemenu #two").text('-100 to 100 mV')
        $("#continuity").hide();
        switch(rangeVal) {
            case 0:
                $(".attributes #autorange").text('Voltage | -10 to 10 V')
                break
            case 1:
                $(".attributes #autorange").text('Voltage | -1 to 1 V')
                break
            case 2:
                $(".attributes #autorange").text('Voltage | -100 to 100 mV')
                break       
            case 3:
                $(".attributes #autorange").text('Voltage | Auto')
                break       
        }
        commandMsg = 'MEASure:VOLTage:DC?;'
    })
    $("#current").on('click', function(e) {
        unit = 'A'
        unitType = ''
        $('.modemenu').toggle()
        $("h1 #unitvalue").text(unit)
        $(".attributes #acdc").text('')
        $(".rangemenu #zero").text('-1 to 1 A')
        $(".rangemenu #one").text('-100 to 100 mA')
        $(".rangemenu #two").text('-10 to 10 mA')
        $("#continuity").hide();
        switch(rangeVal) {
            case 0:
                $(".attributes #autorange").text('Current | -1 to 1 A')
                break
            case 1:
                $(".attributes #autorange").text('Current | -100 to 100 mA')
                break
            case 2:
                $(".attributes #autorange").text('Current | -10 to 10 mA')
                break       
            case 3:
                $(".attributes #autorange").text('Current | Auto')
                break       
        }
        commandMsg = 'MEASure:CURRent?;'
    })
    $("#resistance").on('click', function(e) {
        unit = 'R'
        unitType = ''
        $('.modemenu').toggle()
        $("h1 #unitvalue").text(unit)
        $(".attributes #acdc").text('')
        $(".rangemenu #zero").text('100K to 1M Ohm')
        $(".rangemenu #one").text('10k to 100k Ohm')
        $(".rangemenu #two").text('0 to 10k Ohm')
        $("#continuity").show();
        switch(rangeVal) {
            case 0:
                $(".attributes #autorange").text('Resistance | 100k to 1M Ohm')
                break
            case 1:
                $(".attributes #autorange").text('Resistance | 10k to 100k Ohm')
                break
            case 2:
                $(".attributes #autorange").text('Resistance | 0 to 10k Ohm')
                break       
            case 3:
                $(".attributes #autorange").text('Resistance | Auto')
                break       
        }
        commandMsg = 'MEASure:RESIstance?;'
    })
    
}

// function getUnitType() {
//     $("#AC").on('click', function(e){
//         unitType = 'AC'
//         console.log(unitType)
//         $(".attributes #acdc").text(unitType)
//     })
//     $("#DC").on('click', function(e){
//         unitType = 'DC'
//         $(".attributes #acdc").text(unitType)
//         console.log(unitType)
//     })
// }

function getRange() {
    $('#zero').on('click', function(e) {
        $('.rangemenu').toggle()
        $(".attributes #autorange").text('')
        ws.send('RANGE 0;', function(){
        })
        rangeVal = 0
        switch(unit) {
            case 'V':
                $(".attributes #autorange").text('Voltage | -10 to 10 V')
                break
            case 'A':
                $(".attributes #autorange").text('Current | -1 to 1 A')
                break
            case 'R':
                $(".attributes #autorange").text('Resistance | 100k to 1M Ohm')
                break       
        }
    })
    $('#one').on('click', function(e) {
        $('.rangemenu').toggle()
        $(".attributes #autorange").text('')
        ws.send('RANGE 1;', function(){
        })
        rangeVal = 1
        switch(unit) {
            case 'V':
                $(".attributes #autorange").text('Voltage | -1 to 1 V')
                break
            case 'A':
                $(".attributes #autorange").text('Current | -100 to 100 mA')
                break
            case 'R':
                $(".attributes #autorange").text('Resistance | 10k to 100k Ohm')
                break       
        }
    })
    $('#two').on('click', function(e) {
        $('.rangemenu').toggle()
        $(".attributes #autorange").text('')
        ws.send('RANGE 2;', function(){
        })
        rangeVal = 2
        switch(unit) {
            case 'V':
                $(".attributes #autorange").text('Voltage | -100 to 100 mV')
                break
            case 'A':
                $(".attributes #autorange").text('Current | -10 to 10 mA')
                break
            case 'R':
                $(".attributes #autorange").text('Resistance | 0 to 10k Ohm')
                break       
        }
    })
    $('#auto').on('click', function(e) {
        $('.rangemenu').toggle()
        rangeVal = 3
        switch(unit) {
            case 'V':
                $(".attributes #autorange").text('Voltage | Auto')
                break
            case 'A':
                $(".attributes #autorange").text('Current | Auto')
                break
            case 'R':
                $(".attributes #autorange").text('Resistance | Auto')
                break       
        }
        ws.send('RANGE AUTO;', function(){
        })
    })

}

function getAudio() {
    $('#settings').on('click', function(e){
        if($('#settings').text() === 'Audio: On'){
            ws.send('Audio: Off;', function(){
                $('#settings').text('Audio: Off')
            })
        }
        else {
            ws.send('Audio: On;', function(){
                $('#settings').text('Audio: On')
            })
        }
    })
}

function addContinuityHandler() {

    let cont = false;

    $('#continuity').on('click', function (e) {
        if (unit === 'R') {
            if (cont) {
                ws.send('CONTinuity Off;', function(){
                    $("#continuity").text("Continuity: Off")
                    cont = false;
                })
            }
            else {
                ws.send('CONTinuity On;', function(){
                    $("#continuity").text("Continuity: On")
                    cont = true;
                })                
            }
        }
    })

}

function tempReading() {
    let temp = false;
    command = "MEASure:ENV?;"
    ws.send(command, function (i) {
        console.log(i)
        var temp_info = JSON.parse(i)
        console.log(temp_info)      
        $("#temp").text(temp_info[0]+'*C')
        $("#pressure").text(temp_info[1]+'Pa')
        $("#alt").text(temp_info[2]+'m')
        $("#sealvl").text(temp_info[3]+'Pa')
        $("#humid").text(temp_info[4]+'%')
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

// function msg2Board() {
//     var mode;
//     switch(unit) {
//         case 'V':
//             mode = "VOLTage"
//             return "MEASure:" + mode+':' + unitType + '?;'
//             break
//         case 'A':
//             mode = "CURRent"
//             return "MEASure:" + mode + '?;'
//             break
//         case 'R':
//             mode = "RESIstance"
//             return "MEASure:" + mode + '?;'
//             break       
//     }
    
// }

function display() {

    var command = commandMsg
    console.log(command)
    var n = command.length

    ws.send(command, function (i) {

        console.log(i);
        try {
            if (command.charAt(n-2) === '?'){
                var value = myRe.exec(i)
                if (value[1].trim().length > 0) {
                    console.log(value[1])

                    console.log("Message received", i)
            
                    $("h1 #value").text(value[1])
            
                    if (logDataFlag === 'Y') {
                        loggedData.push(parseEng(value[1]))
                        timeData.push(timeNow())
                        unitData.push(unit + ' ' + unitType)
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
                }

                

            }
        }
        catch(err){
            console.error(err);
        }
        
    });

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
            runInt = setInterval(function() {display(logDataFlag)}, 500)
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
        if(confirm("Are you sure you want remove logged data?")){
            logDataFlag = 'C'
        }
    })
        
    runInt = setInterval(display, 500)

    turnOff()
    menu()
    getMode()
    getAudio()
    addContinuityHandler()
    // getUnitType()
    getRange()
    screenShot()
    setTimeout(function(){
        setInterval(tempReading, 5000)
    },250)
    // setInterval(msg2Board, 1000)
    
})
