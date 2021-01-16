var aesjs = require('aes-js');
const sensorController = require("../controllers/sensor_controller")

const sensor_id_list = ["0","1","2","3","4"]
key = [70, 251, 179, 142, 194, 240, 230, 117, 242, 181, 175, 93, 117, 144, 189, 6]

const check_sensor = (req, res, next) => {
    //console.log(req)
    var body = "";
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', async function(req, res) {
        var id_sensor = JSON.parse(body).id_sensor
        var lectura = JSON.parse(body).lectura
        var iv = JSON.parse(body).token
        //console.log("id:",JSON.parse(body).id_sensor, "data:",JSON.parse(body).lectura, iv);

        var aes_id = new aesjs.ModeOfOperation.ofb(key, iv);
        //var aes_lecture = new aesjs.ModeOfOperation.ofb(key, iv);
        
        var decrypted_id_Bytes = aes_id.decrypt(id_sensor);
        //var decrypted_lecture_Bytes = aes_lecture.decrypt(lectura);
        
        var id_decrypted = aesjs.utils.utf8.fromBytes(decrypted_id_Bytes);
        //var lecture_decrypted = aesjs.utils.utf8.fromBytes(decrypted_lecture_Bytes)

        //console.log(lecture_decrypted)

        if (sensor_id_list.includes(id_decrypted)) {
            //console.log("Sensor identificado:", id_decrypted)
            //req.id_sensor = id_sensor
            //req.lectura = lectura
            //req.token = iv
            await sensorController.save_info(id_decrypted, lectura, iv)

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



