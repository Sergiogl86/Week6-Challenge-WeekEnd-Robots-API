const debug = require("debug")("robots:robotsController");
const chalk = require("chalk");
const Robot = require("../../database/models/robots");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  debug(chalk.red("Haciendo el get a /"));
  res.json(robots);
};

const getIdRobot = async (req, res, next) => {
  const { idRobot } = req.params;
  if (typeof idRobot === "string") {
    const error = new Error("Peticion erronea");
    error.code = 404;
    next(error);
  }
  debug(chalk.red(`Haciendo el buscando a /${idRobot}`));
  const getRobot = await Robot.findOne({
    _id: idRobot,
  });
  res.json(getRobot);
};

const tokenControl = (req, res, next) => {
  const { token } = { ...req.query };
  debug(chalk.red(`Ha llegado el token = ${token}`));
  if (token === "h29D8b23Llm45") {
    next();
  } else {
    res.json({ error: "Introducir el token correcto!" });
  }
};

const crearRobot = async (req, res, next) => {
  try {
    debug(chalk.red("Haciendo el post a /"));
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const deleteRobot = async (req, res, next) => {
  try {
    const { idRobot } = req.params;
    debug(chalk.red(`Haciendo el DELETE a /delete/${idRobot}`));
    await Robot.deleteOne({
      _id: idRobot,
    });
    res.json({ id: idRobot });
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

module.exports = {
  getRobots,
  getIdRobot,
  deleteRobot,
  crearRobot,
  tokenControl,
};
