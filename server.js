var dgram = require("dgram");

var server = dgram.createSocket("udp4");

var data;
var hosts = [];
const msgType = {

    CREATE_HOST: 0,
	JOIN_HOST: 1,
	STOP_HOST: 2,
    SET_PLAYER_STAT: 3,
    GET_HOSTS: 4
}

function player(x,y){
    this.x = x;
    this.y = y;

}

server.on("message", function(msg, rinfo){
    console.log("< " + String(msg))
    data = JSON.parse(msg);
    switch (data.type) {
        case msgType.SET_PLAYER_STAT:
            set_player_stat(data,rinfo);
            break;
        case msgType.CREATE_HOST:
            create_host(data,rinfo);
            break;
        case msgType.STOP_HOST:
            stop_host(data,rinfo);
            break;
        case msgType.GET_HOSTS:
            get_hosts(data,rinfo);
            break;
    
        default:
            break;
    }
});

function set_player_stat(data,rinfo){
    console.log("set_player_stat function")

    
}

function create_host(data,rinfo){
    console.log("create_host function")
    var hostNumber = hosts.length;
    hosts.push([new player(0,0)]);

    data.hostNumber = hostNumber;
    data.playerNumber = 0;

    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
    console.table(hosts);

}

function stop_host(data, rinfo){
    console.log("Stop_host function");
    var host_to_stop = hosts.indexOf(data.hostnumber);
    hosts.splice(host_to_stop, 1);
    data.res = "stoped";
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
    console.table(hosts);
}

function get_hosts(data, rinfo){
    console.log("get_hosts function");
    data.hosts = hosts;
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
}

server.bind(8080);
