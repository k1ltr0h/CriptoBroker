//middleware con funciones para desencriptar el id del sensor y el mensaje.
//Debe verificar el id conocido.
//const parseJson = require('parse-json');
var aesjs = require('aes-js');

const sensor_id_list = ["0","1","2","3","4"]
key = [70, 251, 179, 142, 194, 240, 230, 117, 242, 181, 175, 93, 117, 144, 189, 6]

//const b = 233
//const P = 99991
//const P_b =  
//const a



const check_sensor = (req, res, next) => {
    var body = "";
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        //res.write("OK"); 
        //res.end(); 
        var id_sensor = JSON.parse(body).id_sensor
        var lectura = JSON.parse(body).lectura
        var iv = JSON.parse(body).token
        //console.log(JSON.parse(body).id_sensor, JSON.parse(body).lectura);
        console.log(iv)
        var encryptedBytes = aesjs.utils.hex.toBytes(id_sensor);
        var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv);
        var decryptedBytes = aesCfb.decrypt(encryptedBytes);
 
        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        console.log(decryptedText);
        // "TextMustBeAMultipleOfSegmentSize"

        if (sensor_id_list.includes(id_sensor)) {
            console.log("Sensor identificado")
            req.userId = id_sensor
        }
        else {
            console.log("acceso a sensor denegado!")
            req.userId = null
        } 
        
    })

    next();
}

const check_db = (req, res, next) => {
    //console.log("checking db")
    //console.log(req.headers)
    next()
}

module.exports = {
    check_sensor: check_sensor,
    check_db: check_db
}