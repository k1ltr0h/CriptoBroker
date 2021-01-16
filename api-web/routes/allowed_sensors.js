const allowed_sensors = require("../models/allowed_sensors")

var express = require('express');
var router = express.Router();

module.exports = router;
/*
router.post("/id", async function(req, res){
    console.log(req.body.id)
    await allowed_sensors.create({ 
        id: req.body.id
        })
        .then(us => { 
            console.log("Datos registrados exitosamente.");
            res.sendStatus(200)
        })
        .catch(error => {
            console.log(error);
    });

});*/

router.get("/all", function (req, res) {
    allowed_sensors.findAll({
         raw: true,
         limit:10,
        }).then(function(sensor){
            res.send({error:false, message:'users list', data:sensor});
        }).catch(function(err){
            console.log('Oops! something went wrong, : ', err);
    });
});