const express = require('express')
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
var mysql = require('mysql2');
const config = require("./config.json")

const app = express()
var register = require('./routes/register.js');
var allowed = require('./routes/allowed_sensors.js');
const allowed_sensors = require('./models/allowed_sensors');

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
app.use(express.json())

app.use('/sensor', register);
app.use('/allowed', allowed);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});