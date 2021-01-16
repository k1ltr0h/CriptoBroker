const express = require('express')
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
var mysql = require('mysql2');
const config = require("./config.json")

const app = express()
var register = require('./routes/register.js');

const port = 9600

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

app.use('/sensor', register);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cors())

//var myjsondata = { "id-sensor": 27 ,"temp": 28, "humidity": 65, "uv": 0.8}
//var myjsondata28 = { "id-sensor": 28 ,"temp": 34, "humidity": 20, "uv": 0.8}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/*
// testing front data
app.get('/sensor/27', (req,res) => {
  res.send(JSON.stringify(myjsondata))
})

app.get('/sensor/28', (req,res) => {
  res.send(JSON.stringify(myjsondata28))
})*/