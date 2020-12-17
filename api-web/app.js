const express = require('express')
const app = express()
const port = 5237
const path = require('path');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) =>{
    //res.send('wena los K . Funca? siono? dale Victor, lokoooooaaaahhHHHHH')
    res.sendFile(path.join(__dirname+'/chart-sample.html'))
})