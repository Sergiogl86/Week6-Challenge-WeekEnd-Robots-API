const express = require("express");
const debug = require("debug")("robots:robotsRoutes");
const {
  getRobots,
  getIdRobot,
  tokenControl,
  deleteRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getIdRobot);

router.delete("/delete/:idRobot", tokenControl, deleteRobot);

/* 

router.post("/create", xxxxx);

router.put("/update", xxxxx);

 */

module.exports = router;
