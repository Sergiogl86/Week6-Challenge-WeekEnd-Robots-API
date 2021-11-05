const express = require("express");
const debug = require("debug")("robots:robotsRoutes");
const {
  getRobots,
  getIdRobot,
  tokenControl,
  deleteRobot,
  crearRobot,
  modificarRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getIdRobot);

router.post("/create", tokenControl, crearRobot);

router.put("/update", tokenControl, modificarRobot);

router.delete("/delete/:idRobot", tokenControl, deleteRobot);

module.exports = router;
