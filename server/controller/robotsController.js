const debug = require("debug")("robots:robotsController");
const chalk = require("chalk");
const Robot = require("../../database/models/robots");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  debug(chalk.red("Haciendo el get a /"));
  res.json(robots);
};

module.exports = { getRobots };
