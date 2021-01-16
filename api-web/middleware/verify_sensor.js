//middleware con funciones para desencriptar el id del sensor y el mensaje.
//Debe verificar el id conocido.

const check_sensor = (req, res, next) => {


    //res.send(JSON.stringify("middleware"))
    console.log('middleware')

    next();
}

module.exports = {
    check_sensor: check_sensor
}