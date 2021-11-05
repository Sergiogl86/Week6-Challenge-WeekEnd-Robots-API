const debug = require("debug")("robots:robotsController");
const chalk = require("chalk");
const Robot = require("../../database/models/robots");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  debug(chalk.red("Haciendo el get a /"));
  res.json(robots);
};

const getIdRobot = async (req, res) => {
  const { idRobot } = req.params;
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
    res.json({ error: "Es necesario introducir token!" });
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
  tokenControl,
};
