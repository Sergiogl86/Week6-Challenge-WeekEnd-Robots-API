const express = require("express");
const debug = require("debug")("robots:users");
const { validate } = require("express-validation");
const {
  getusers,
  createUser,
  loginUser,
} = require("../controller/usersController");
const loginSchema = require("../schemas/loginSchema");

const router = express.Router();

router.post("/crear", createUser);

router.post("/login", validate(loginSchema), loginUser);

router.get("/", getusers);

module.exports = router;
