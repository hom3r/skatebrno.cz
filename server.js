var express = require('express');
var app = express();
var path = require('path');

// var server_port = process.env.OPENSHIFT_NODEJS_PORT || 80;
var server_port = 80;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(express.static(__dirname + '/dist'));

console.log("Starting server on port " + server_port);
console.log(process.env);

app.listen(server_port, server_ip_address, function(){
    console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});
