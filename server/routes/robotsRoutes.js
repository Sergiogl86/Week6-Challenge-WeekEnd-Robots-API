const express = require("express");

const debug = require("debug")("robots:robotsRoutes");

const router = express.Router();

router.get("/", xxxxx);

router.get("/:idRobot", xxxxx);

router.post("/create", xxxxx);

router.put("/update", xxxxx);

router.delete("/delete/:idRobot", xxxxx);

module.exports = router;
