var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
const http = require('http');
// var config = require("./config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global declaration of the Couchbase server and bucket to be used
// module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
var cluster = new couchbase.Cluster('http://144.217.204.89:8091/');

app.use(express.static(path.join(__dirname, "")));

// All endpoints to be used in this application
var routes = require("./routes/routes.js")(app);
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
