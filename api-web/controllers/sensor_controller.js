var sensores = require('../models/sensors');

exports.get_all = function (req, res) {
    sensores.findAll({
         raw: true,
         limit:10,
        }).then(function(sensor){
            res.send({error:false, message:'users list', data:sensor});
        }).catch(function(err){
            console.log('Oops! something went wrong, : ', err);
        });
}

exports.get_by_id = function (req, res) {
    var id = req.param('id');

    sensores.findAll({
        where: {
            id_sensor: id
          },
        order: [['fecha', 'DESC']],
        raw: true,
        limit: 1,
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