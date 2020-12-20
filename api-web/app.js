const express = require('express')
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
var mysql = require('mysql2');
const config = require("./config.json")

const app = express()
var register = require('./routes/register.js');

const port = 5238

// mysql_config --socket
// var connection = mysql.createConnection({
//   socketPath : '/tmp/mysql.sock',
//   user       : 'root',
//   password   : '123'
// });

var con = mysql.createConnection({
  host: config.host,
  database : config.database,
  port: config.port, // 3306
  user: config.username,
  password: config.password
});

con.connect(function(err){
  if(err) throw err;
  console.log('connected!');
});

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};


app.all("*",cors(corsOptions));

app.use('/add', register);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(cors())

var myjsondata = { "id-sensor": 27 ,"temp": 28, "humidity": 65, "uv": 0.8}
var myjsondata28 = { "id-sensor": 28 ,"temp": 34, "humidity": 20, "uv": 0.8}


// testing front data
app.get('/sensor/27', (req,res) => {
  res.send(JSON.stringify(myjsondata))
})

app.get('/sensor/28', (req,res) => {
  res.send(JSON.stringify(myjsondata28))
})

// post data to DB
//app.post('')



/*
var mqtt = require('mqtt');
const { query } = require('express');
var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
client.on('connect', function () {
  client.subscribe('sensorB', function (err) {
    if (!err) {
      client.publish('sensorB', 'Hello mqtt from node')
    }
  })
})


 
client.on('message', function (topic, message, packet) {
  // message is Buffer
  console.log("message: " + message)
  console.log("topic: " + topic)
})
var enc = "asjfhasldghÑSGHLAKJGHIOA8W4TIUWHRGLIAJEÑRIGJLIsegwkefdchupalacorneta"

client.publish('sensorB', JSON.stringify(myjsondata))

//console.log(JSON.stringify(myjsondata))

*/