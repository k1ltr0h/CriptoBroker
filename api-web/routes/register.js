const sensorController = require("../controllers/sensor_controller")
const verifySensor = require("../middleware/verify_sensor")  //--> descomentar al implementar!!

var express = require('express');
var router = express.Router();

module.exports = router;

router.post("/add", verifySensor.check_sensor);

router.use("/all", verifySensor.check_db);
router.get("/all", sensorController.get_all);
router.get("/id/:id", sensorController.get_by_id);

