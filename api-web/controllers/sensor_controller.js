var sensores = require('../models/sensors');
const parseJson = require('parse-json');

exports.get_all = function (req, res) {
    console.log('uwu')
    sensores.findAll({
         raw: true,
         limit:5,
        }).then(function(sensor){
            //console.log(sensor);
            res.send({error:false,message:'users list',data:sensor});
        }).catch(function(err){
            console.log('Oops! something went wrong, : ', err);
        });
}

exports.save_info = function (req, res) {
    console.log("Agregando registro de sensor...");

    console.log(req.method, req.url, req.headers);

    var body = "";
    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', async function() {
        //console.log(JSON.parse(body).id_sensor, JSON.parse(body).lectura);
        res.write("OK"); 
        res.end(); 
        console.log(body)
        await sensores.create({ 
            id_sensor: JSON.parse(body).id_sensor,
            lectura: JSON.parse(body).lectura
            })
            .then(us => { 
                console.log("Datos registrados exitosamente.");
                res.json({
                    type: true,
                    data: "Datos registrados exitosamente."
                });
            })
            .catch(error => {
                console.log(error);
                res.json({
                    type: false,
                    data: "Error, los datos no se han podido registrar"
                });
            });
    });
}