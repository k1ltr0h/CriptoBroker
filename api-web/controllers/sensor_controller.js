var sensores = require('../models/sensors');
const parseJson = require('parse-json');

exports.get_all = function (req, res) {
    console.log()
    sensores.findAll({
         raw: true,
         limit:5,
        }).then(function(sensor){
            res.send({error:false, message:'users list', data:sensor});
        }).catch(function(err){
            console.log('Oops! something went wrong, : ', err);
        });
}

exports.save_info = async function (id_sensor, lectura, token) {
    console.log("Agregando registro de sensor...");
 
    await sensores.create({ 
        id_sensor: String(id_sensor),
        lectura: String(lectura),
        token: String(token)
        })
        .then(us => { 
            console.log("Datos registrados exitosamente.");
        })
        .catch(error => {
            console.log(error);
    });
}