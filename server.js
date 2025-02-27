var dgram = require("dgram");

var server = dgram.createSocket("udp4");

var data;

const msgType = {

    CREATE_HOST: 0,
	JOIN_HOST: 1,
	STOP_HOST: 2,
    SET_PLAYER_STAT: 3

}

server.on("message", function(msg, rinfo){
    console.log("< " + String(msg))
    data = JSON.parse(msg);
    switch (data.type) {
        case msgType.SET_PLAYER_STAT:
            set_player_stat(data,rinfo);
            break;
    
        default:
            break;
    }
});

function set_player_stat(data,rinfo){
    console.log("set_player_stat function")

    server.send(JSON.stringify(data), rinfo.port, rinfo.address)
}

server.bind(8080);
