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

module.exports = { getRobots, getIdRobot };
