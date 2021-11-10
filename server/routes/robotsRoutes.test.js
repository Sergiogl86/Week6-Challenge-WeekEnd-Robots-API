require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const debug = require("debug")("robots:testroute");
const chalk = require("chalk");
const connectDB = require("../../database");
const { app, iniciarServidor } = require("..");
const Robot = require("../../database/models/robots");

let server;
let token;
const robotPrueba1 = {
  _id: "6187ec0fbbc7bceb2ea0e1ac",
  nombre: "robotPrueba1",
  imagenUrl: "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
  caracteristicas: {
    velocidad: 7,
    resistencia: 6,
    FechaCeCreacion: "2019-08-08",
  },
};
const robotPrueba2 = {
  _id: "61880b4a2cdcee28629fbab6",
  nombre: "robotPrueba2",
  imagenUrl:
    "https://cloud.educaplay.com/recursos/131/4221007/imagen_1_1546953112.jpg",
  caracteristicas: {
    velocidad: 2,
    resistencia: 2,
    FechaCeCreacion: "2021-11-10",
  },
  __v: 0,
};

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
  await Robot.create(robotPrueba1);
  await Robot.create(robotPrueba2);
  debug(chalk.green("Envio! Robot"));
});

afterEach(async () => {
  await Robot.deleteMany({});
  debug(chalk.red("Borro robots!!"));
});

afterAll(async () => {
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

      expect(body[0]).toHaveProperty("nombre", "robotPrueba1");
      expect(body[0]).toHaveProperty("id", "6187ec0fbbc7bceb2ea0e1ac");
    });
  });
});

describe("Given a robotsRoutes", () => {
  describe("When it receives delete on /robots/delete/6187ec0fbbc7bceb2ea0e1ac", () => {
    test("Then it should delete a robots with id 6187ec0fbbc7bceb2ea0e1ac", async () => {
      const { body } = await request(app)
        .delete("/robots/delete/6187ec0fbbc7bceb2ea0e1ac")
        .set("Authorization", `Bearer ${token}`);

      debug(chalk.green("Resultado de delete robots!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body).toHaveProperty("id", "6187ec0fbbc7bceb2ea0e1ac");
    });
  });
});
