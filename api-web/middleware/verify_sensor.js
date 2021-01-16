var aesjs = require('aes-js');
const sensorController = require("../controllers/sensor_controller")
const allowed_sensors = require("../models/allowed_sensors")

const sensor_id_list = ["0","1","2","3","4"]
key = [70, 251, 179, 142, 194, 240, 230, 117, 242, 181, 175, 93, 117, 144, 189, 6]

const check_sensor = async (req, res, next) => {

    var id_sensor = req.body.id_sensor
    var lectura = req.body.lectura
    var iv = req.body.token

    var aes_id = new aesjs.ModeOfOperation.ofb(key, iv);
    var decrypted_id_Bytes = aes_id.decrypt(id_sensor);
    var id_decrypted = aesjs.utils.utf8.fromBytes(decrypted_id_Bytes);

    var sensor_id_list = []

    await allowed_sensors.findAll({
        raw: true,
        limit:10,
       }).then(function(sensor){
           sensor_id_list = sensor
       }).catch(function(err){
           console.log('Oops! something went wrong, : ', err);
    });

    for(i=0; i < sensor_id_list.length; i++){
        sensor_id_list[i] = String(sensor_id_list[i].id)
    }

    if (sensor_id_list.includes(id_decrypted)) {
        console.log("ID sensor identificado:", id_decrypted)
        await sensorController.save_info(id_decrypted, lectura, iv)
        res.sendStatus(200);

    }
    else {
        console.log("acceso a sensor denegado!")
        req.userId = null
        res.sendStatus(400);
    }  
next();
}

const check_db = (req, res, next) => {
    res.sendStatus(200)
    next()
}

module.exports = {
    check_sensor: check_sensor,
    check_db: check_db
}



