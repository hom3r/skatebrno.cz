var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || 'localhost';

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(express.static(__dirname + '/dist'));

console.log("Starting server on http://" + ip + ":" + port + "...");

app.listen(port);
