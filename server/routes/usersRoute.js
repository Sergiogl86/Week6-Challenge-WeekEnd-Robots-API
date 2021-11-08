const express = require("express");
const debug = require("debug")("robots:users");
const {
  getusers,
  createUser,
  loginUser,
} = require("../controller/usersController");

const router = express.Router();

router.post("/crear", createUser);

router.post("/login", loginUser);

router.get("/", getusers);

module.exports = router;
