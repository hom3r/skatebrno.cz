var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(express.static(__dirname + '/dist'));

console.log("Starting server on http://localhost:8080...");

app.listen(8080);
