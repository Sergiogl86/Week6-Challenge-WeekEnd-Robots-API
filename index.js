require("dotenv").config();

const conectarBD = require("./database/index");
const { iniciarServidor } = require("./server/index");

const port = process.env.PORT ?? process.env.ROBOTS ?? 5000;

(async () => {
  await conectarBD(process.env.MONGODB_STRING);
  await iniciarServidor(port);
})();
