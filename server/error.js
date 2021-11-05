const debug = require("debug")("robots:error");

const noEncontradoHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado!" });
};

const finalErrorHandler = (error, req, res, next) => {
  debug("Ha ocurrido un error: ", error.message);
  const message = error.code ? error.message : "Error General";
  res.status(error.code || 500).json({ error: message });
};

module.exports = { noEncontradoHandler, finalErrorHandler };
