const sensorController = require("../controllers/sensor_controller")
const verifySensor = require("../middleware/verify_sensor")  //--> descomentar al implementar!!

var express = require('express');
var router = express.Router();

module.exports = router;

router.use(verifySensor.check_sensor)
<<<<<<< HEAD
router.post("/data", sensorController.save_info);
router.get("/all", sensorController.get_all);
=======
router.post("/data", sensorController.save_info);
>>>>>>> 612b33fee28d5c7cbc28a599d53af49886224569
