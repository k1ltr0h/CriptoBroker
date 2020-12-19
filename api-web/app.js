const express = require('express')
const app = express()
const port = 5237
const path = require('path');
var cors = require('cors')

app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) =>{
    //res.send('wena los K . Funca? siono? dale Victor, lokoooooaaaahhHHHHH')
    res.sendFile(path.join(__dirname+'/chart-sample.html'))
})


var myjsondata = { "id-sensor": 27 ,"temp": 28, "humidity": 65, "uv": 0.8}
var myjsondata28 = { "id-sensor": 28 ,"temp": 34, "humidity": 20, "uv": 0.8}


// get data from DB
app.get('/sensor/27', (req,res) => {
  res.send(JSON.stringify(myjsondata))
})

app.get('/sensor/28', (req,res) => {
  res.send(JSON.stringify(myjsondata28))
})

// post data to DB
//app.post('')




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