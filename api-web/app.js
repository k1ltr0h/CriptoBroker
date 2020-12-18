const express = require('express')
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
var mysql = require('mysql2');
const config = require("./config.json")

const app = express()

var register = require('./routes/register.js');

const port = 5237

var con = mysql.createConnection({
  host: config.host,
  database : config.database,
  port: '3306',
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

app.get('/', (req, res) =>{
  //res.send('wena los K . Funca? siono? dale Victor, lokoooooaaaahhHHHHH')
  res.sendFile(path.join(__dirname+'/chart-sample.html'));
});