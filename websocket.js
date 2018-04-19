const reader = new FileReader();

const commands = {
    '*IDN?': () => "TESTING IDENT",
    'MEASure:VOLTage:AC?;': () => ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6),
    'MEASure:VOLTage:DC?;': () => ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6),
    'MEASure:CURRent:DC?;': () => ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6),
    'MEASure:CURRent:AC?;': () => ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6),
    'MEASure:RESIstance:DC?;': () => ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6),
    'MEASure:RESIstance:AC?;': () => ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6),
};

var connected = false;

function Websocket(testing) {

    this.testing = testing;

    if (!testing) {

        this.ws = new WebSocket("ws://localhost:8000");

        this.ws.onopen = function () {
            console.log("Connected to WS");
            connected = true;
        };

        this.ws.onclose = function () {
            console.log("Disconnected from WS");
            connected = false;
        };

    }

}

Websocket.prototype.send = function (comm, clb) {

    if (this.testing) {

        if (!(comm in commands)) {
            clb("ERROR");
        } else {
            clb(commands[comm]());
        }

    } else if(connected) {
        this.ws.send(comm);
        this.ws.onmessage = function (evt) {
            reader.readAsText(evt.data);
            reader.onload = function () {
                clb(reader.result);
            }
        };
    } else {
        clb(null);
        console.warn("Not connected to WS yet");
    }

};

module.exports = Websocket;