const reader = new FileReader();
const siArray = ['', 'm', 'k']

const commands = {
    '*IDN?': () => "TESTING IDENT" + '\n',
    'MEASure:VOLTage:AC?;': () => "VOLTAGE:AC " + ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6) + (siArray[Math.floor(Math.random() * 3)]) + '\n',
    'MEASure:VOLTage:DC?;': () => "VOLTAGE:DC " + ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6) + (siArray[Math.floor(Math.random() * 3)]) + '\n',
    'MEASure:CURRent?;':    () => "CURRENT " +    ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6) + (siArray[Math.floor(Math.random() * 3)]) + '\n',
    'MEASure:RESIstance?;': () => "RESISTANCE " + ((Math.random() * 2000) - 1000 / (Math.random() * 100)).toFixed(6) + (siArray[Math.floor(Math.random() * 3)]) + '\n',
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

    console.log(comm);

    if (this.testing) {

        if (!(comm in commands)) {
            clb("TEST MODE ERROR");
        } else {
            clb(commands[comm]());
        }

    } else if(connected) {
        this.ws.send(comm);
        this.ws.onmessage = function (evt) {
            if (evt.data instanceof String) {
                console.log(comm);
                clb(evt.data);
            } else {
                try{
                    reader.readAsText(evt.data);
                    reader.onload = function () {
                        clb(reader.result);
                        console.log(comm);
                    }
                }                
                catch(err){
                    clb(evt.data)            
                }
            }
        };
    } else {
        clb(null);
        console.warn("Not connected to WS yet");
    }

};

module.exports = Websocket;
