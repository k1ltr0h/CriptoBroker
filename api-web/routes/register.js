const sensorController = require("../controllers/sensor_controller")
const verifySensor = require("../middleware/verify_sensor")  //--> descomentar al implementar!!

var express = require('express');
var router = express.Router();

module.exports = router;

router.use(verifySensor.check_sensor)
//router.post("/data", sensorController.save_info);

router.use(verifySensor.check_db)
router.get("/all", sensorController.get_all);

