const express = require("express");
const debug = require("debug")("robots:servidor");
const chalk = require("chalk");

const app = express();

const iniciarServidor = (port) => {
  const servidor = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });

  servidor.on("error", (error) => {
    debug(chalk.red("Ha habido un error al iniciar el servidor."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} está bloqueado.`));
    }
  });
};

module.exports = iniciarServidor;
