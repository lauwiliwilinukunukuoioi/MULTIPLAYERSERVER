var dgram = require("dgram");

var server = dgram.createSocket("udp4");

var data;

server.on("message", function(msg, rinfo){
    console.log(String(msg));
    data = JSON.parse(msg);
    console.log(String(data.x));
    //server.send("message has recieved", rinfo.port, rinfo.adress);
});

server.bind(8080)