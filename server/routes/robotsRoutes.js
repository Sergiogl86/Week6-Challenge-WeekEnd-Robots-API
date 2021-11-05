const express = require("express");
const debug = require("debug")("robots:robotsRoutes");
const { getRobots, getIdRobot } = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getIdRobot);

/* 

router.post("/create", xxxxx);

router.put("/update", xxxxx);

router.delete("/delete/:idRobot", xxxxx); */

module.exports = router;
