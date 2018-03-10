$(document).ready(function() {
    const electron = require('electron')
    const {remote} = require('electron')
    var win = remote.getCurrentWindow() 

    let valueData = JSON.parse(localStorage.getItem('storedData'))
    let timeData = JSON.parse(localStorage.getItem('timeData'))
    let unitData = JSON.parse(localStorage.getItem('unitData'))

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
        var unitInstance


        for (var i = 0; i < valueData.length; i++){
            length.push(i+1)
            if (unitData[i].charAt(0) === 'V'){
                if (unitData[i].charAt(2) === 'A') {
                    unitInstance = "Voltage - AC"
                }
                else if (unitData[i].charAt(2) === 'D') {
                    unitInstance = "Voltage - DC"
                }
            }
            else if (unitData[i].charAt(0) === 'A'){
                if (unitData[i].charAt(2) === 'A') {
                    unitInstance = "Current - AC"
                }
                else if (unitData[i].charAt(2) === 'D') {
                    unitInstance = "Current - DC"
                }
            }
            else if (unitData[i].charAt(0) === 'R'){
                unitInstance = "Resistance"
            }
            tableValues[i] = [length[i], timeData[i], unitInstance, valueData[i]]
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

    function exportTableToCSV($table, filename) {

        var $rows = $table.find('tr:has(td),tr:has(th)'),
    
            // Temporary delimiter characters unlikely to be typed by keyboard
            // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character
    
            // actual delimiter characters for CSV format
            colDelim = '","',
            rowDelim = '"\r\n"',
    
            // Grab text from table into CSV formatted string
            csv = '"' + $rows.map(function (i, row) {
                var $row = $(row), $cols = $row.find('td,th');
    
                return $cols.map(function (j, col) {
                    var $col = $(col), text = $col.text();
    
                    return text.replace(/"/g, '""'); // escape double quotes
    
                }).get().join(tmpColDelim);
    
            }).get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim) + '"',
    
            // Data URI
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    
            if (window.navigator.msSaveBlob) { // IE 10+
                //alert('IE' + csv);
                window.navigator.msSaveOrOpenBlob(new Blob([csv], {type: "text/plain;charset=utf-8;"}), "csvname.csv")
            } 
            else {
                $(this).attr({ 'download': filename, 'href': csvData, 'target': '_blank' }); 
            }
    }
    
    // This must be a hyperlink
    $("#export").on('click', function (event) {
    
        exportTableToCSV.apply(this, [$('#loggedResults'), 'Recorded Measurements.csv']);
    
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
    
    turnOff()
    populateData()
    displayData()

})