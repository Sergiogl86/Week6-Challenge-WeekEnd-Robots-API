const debug = require("debug")("robots:auth");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  debug(chalk.green("loginAuth"));

  const authHeader = req.header("Authorization");
  if (!authHeader) {
    debug(chalk.green("falta authHeader"));
    const error = new Error("No estas registrado");
    error.code = 401;
    next(error);
  } else {
    debug(chalk.green("correcto authHeader"));
    const token = authHeader.split(" ")[1];
    debug(chalk.green(`El Token ${token}`));
    if (!token) {
      debug(chalk.green("Token incorrecto"));
      const error = new Error("Necesario token!");
      error.code = 401;
      next(error);
    } else {
      debug(chalk.green("Token recogido"));
      try {
        const user = jwt.verify(token, process.env.ROBOTS_HASH);
        debug(chalk.green(user));
        debug(chalk.green("Token correcto"));
        next();
      } catch {
        debug(chalk.green("Token incorrecto"));
        const error = new Error("Token incorrecto");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = Auth;
