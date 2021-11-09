require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const debug = require("debug")("robots:testroute");
const chalk = require("chalk");
const connectDB = require("../../database");
const { app, iniciarServidor } = require("..");

let server;
let token;

beforeAll(async () => {
  await connectDB(process.env.MONGODB_STRING_TEST);
  server = await iniciarServidor(4002);
  debug(chalk.green("Iniciar Servidor"));
  const response = await request(app)
    .post("/users/login")
    .send({
      nombre: "Sergio",
      contraseña: "Sergio_Entrar",
    })
    .expect(200);
  debug(chalk.green("Resultado de user!"));
  token = JSON.parse(response.text).user;
  debug(chalk.green(token));
});

beforeEach(async () => {
  await request(app)
    .post("/robots/create")
    .set("Authorization", `Bearer ${token}`)
    .send({
      _id: "6187ec0fbbc7bceb2ea0e1ac",
      nombre: "Wall·e 60000",
      imagenUrl:
        "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
      caracteristicas: {
        velocidad: 7,
        resistencia: 6,
        FechaCeCreacion: "2019-08-08",
      },
    });
  debug(chalk.green("Envio! Robot"));
});

afterEach(async () => {
  await request(app)
    .delete("/robots/delete/1234")
    .set("Authorization", `Bearer ${token}`);
  debug(chalk.red("Borro el 1234!!"));
  await mongoose.connection.close();
  await server.close();
  debug(chalk.red("Cerrar Servidor"));
});

describe("Given a robotsRoutes", () => {
  describe("When it receives get on /robots", () => {
    test("Then it should return a list of robots", async () => {
      const { body } = await request(app)
        .get("/robots")
        .set("Authorization", `Bearer ${token}`);

      debug(chalk.green("Resultado de get robots!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body[0]).toHaveProperty("nombre", "Wall·e 60000");
      expect(body[0]).toHaveProperty("id", "6187ec0fbbc7bceb2ea0e1ac");
    });
  });
});
