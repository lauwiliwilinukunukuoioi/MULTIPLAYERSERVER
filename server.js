var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var server2 = dgram.createSocket("udp4");

var data;
var datahere = false;

server.on("message", function(msg, rinfo){
    console.log(String(msg))
    data = JSON.parse(msg);
    datahere = true;
});

server2.on("message", function(msg, rinfo){
    if (datahere) {
    server2.send(JSON.stringify(data), rinfo.port, rinfo.address);
    }
});

server.bind(8080);
server2.bind(8081);