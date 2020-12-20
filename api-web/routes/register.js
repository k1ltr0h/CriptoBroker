var express = require('express');
var router = express.Router();

var sensores = require('../models/sensors');

module.exports = router;

/*router.get("/", function (req, res) {
    //Comprueba que sequelize está conectado a la base de datos
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    //Selecciona todos los datos de la tabla user y renderiza la vista junto con estos
    sequelize.query('SELECT * FROM users',
        { model: users }).then(users => {
            res.render("Registro", { user: users })
        })
});*/

router.post("/data", function (req, res) {
    console.log("Agregando registro de sensor...");

    console.log(req.method, req.url, req.headers);

    var body = "";
    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', async function() {
        console.log(JSON.parse(body).id_sensor, JSON.parse(body).lectura);
        res.write("OK"); 
        res.end(); 

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
});