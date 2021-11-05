const express = require("express");
const debug = require("debug")("robots:robotsRoutes");
const {
  getRobots,
  getIdRobot,
  tokenControl,
  deleteRobot,
  crearRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getIdRobot);

router.post("/create", tokenControl, crearRobot);

router.delete("/delete/:idRobot", tokenControl, deleteRobot);

/* 

router.post("/create", xxxxx);

router.put("/update", xxxxx);

 */

module.exports = router;
