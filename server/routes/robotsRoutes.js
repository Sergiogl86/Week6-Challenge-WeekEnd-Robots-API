const express = require("express");
const debug = require("debug")("robots:robotsRoutes");
const {
  getRobots,
  getIdRobot,
  deleteRobot,
  crearRobot,
  modificarRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getIdRobot);

router.post("/create", crearRobot);

router.put("/update", modificarRobot);

router.delete("/delete/:idRobot", deleteRobot);

module.exports = router;
