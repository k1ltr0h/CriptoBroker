//middleware con funciones para desencriptar el id del sensor y el mensaje.
//Debe verificar el id conocido.
//const parseJson = require('parse-json');
var aesjs = require('aes-js');

const sensor_id_list = ["0","1","2","3","4"]
key = [70, 251, 179, 142, 194, 240, 230, 117, 242, 181, 175, 93, 117, 144, 189, 6]

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
        //console.log("id:",JSON.parse(body).id_sensor, "data:",JSON.parse(body).lectura, iv);

        var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv);
        var aesCfbL = new aesjs.ModeOfOperation.cfb(key, iv);
        var decrypted_id_Bytes = aesCfb.decrypt(id_sensor);
        var decrypted_lecture_Bytes = aesCfbL.decrypt(lectura);
        
        var id_decrypted = aesjs.utils.utf8.fromBytes(decrypted_id_Bytes);
        var lecture_decrypted = aesjs.utils.utf8.fromBytes(decrypted_lecture_Bytes)
        //console.log(lectura)
        //console.log("EL DATO: ",id_decrypted, lecture_decrypted);



        //console.log(iv)
        var encryptedBytes = aesjs.utils.utf8.toBytes("hoagdadatkahsdkghaLKGHNKeshgnkSHLshjfJKSDF.sflebla");
        console.log(lectura, decrypted_lecture_Bytes, encryptedBytes, lecture_decrypted)

        /*var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv);
        var decryptedBytes = aesCfb.decrypt(encryptedBytes);
 
        // Convert our bytes back into text
        
        
        // "TextMustBeAMultipleOfSegmentSize"
*/      //console.log("encryptedBytes:", encryptedBytes)
        if (sensor_id_list.includes(id_decrypted)) {
            console.log("Sensor identificado")
            req.sensorId = id_sensor
            req.data = lectura

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