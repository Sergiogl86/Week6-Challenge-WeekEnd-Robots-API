const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const debug = require("debug")("robots:servidor");
const chalk = require("chalk");
const { noEncontradoHandler, finalErrorHandler } = require("./error");

const robotsRoutes = require("./routes/robotsRoutes");
const usersRoute = require("./routes/usersRoute");

const Auth = require("./middlewares/Auth");

const app = express();

const iniciarServidor = (port) =>
  new Promise((resolve, reject) => {
    const servidor = app.listen(port, () => {
      debug(chalk.yellow(`Escuchando en el puerto ${port}`));
    });

    servidor.on("error", (error) => {
      debug(chalk.red("Ha habido un error al iniciar el servidor."));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`El puerto ${port} está bloqueado.`));
      }
      reject();
    });

    servidor.on("close", () => {
      debug(chalk.yellow("Servidor express desconectado"));
    });

    resolve(servidor);
  });

app.use(morgan("dev"));
app.use(cors()); // <---- use cors middleware
app.use(express.json());

app.use("/users", usersRoute);
app.use("/robots", Auth, robotsRoutes);

app.use(noEncontradoHandler);
app.use(finalErrorHandler);

module.exports = { iniciarServidor, app };
