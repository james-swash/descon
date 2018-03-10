$(document).ready(function() {
    const electron = require('electron')
    const {remote} = require('electron')
    var win = remote.getCurrentWindow() 

    let valueData = JSON.parse(localStorage.getItem('storedData'))
    let timeData = JSON.parse(localStorage.getItem('timeData'))
    var unitData = localStorage.getItem('unitData')

    var tableValues = new Array()
    var tableColumns = new Array("Record Number", "Time of Record", "Unit", "Value")


    function turnOff() {
        $("#off").on('click', () => {
            if(confirm("Are you sure you want to exit the application?")){
                win.close()
                }
            })
    }

    function populateData() {
        var length = []

        switch(unitData) {
            case 'V':
                unitData = "Voltage"
                break
            case 'I':
                unitData = "Current"
                break
            case 'R':
                unitData = "Resistance"
                break
        }

        for (var i = 0; i < valueData.length; i++){
            length.push(i+1)
            tableValues[i] = [length[i], timeData[i], unitData, valueData[i]]
        }
    }

    function displayData() {
        var myTableDiv = document.getElementById("loggedResults")
        var table = document.createElement('table')
        var tableBody = document.createElement('tbody')

        

        var tr = document.createElement('tr');
        var thead = document.createElement('thead')
        thead.appendChild(tr)
        table.appendChild(thead)
        // thead.appendChild(tr)
        for (i = 0; i < tableColumns.length; i++) {
            var th = document.createElement('TH')
            th.width = '25%'
            th.appendChild(document.createTextNode(tableColumns[i]));
            tr.appendChild(th);
        }

        table.appendChild(tableBody);
        for (i = 0; i < tableValues.length; i++) {
            var tr = document.createElement('tr')
            for (j = 0; j < tableValues[i].length; j++) {
                var td = document.createElement('td')
                td.appendChild(document.createTextNode(tableValues[i][j]));
                tr.appendChild(td)
            }
            tableBody.appendChild(tr)
        }
        myTableDiv.appendChild(table)
    }
    
    turnOff()
    populateData()
    displayData()

})