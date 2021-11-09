const debug = require("debug")("robots:database");

const chalk = require("chalk");

const mongoose = require("mongoose");

const conectarBD = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.red("No se ha conectado a BD - Robots."));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Conectado a BD - Robots."));
      resolve();
    });
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    });
  });

module.exports = conectarBD;
