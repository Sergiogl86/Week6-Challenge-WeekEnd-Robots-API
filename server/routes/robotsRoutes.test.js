require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const debug = require("debug")("robots:test-route");
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
const robotCrear = {
  nombre: "robotCrear",
  imagenUrl:
    "https://cloud.educaplay.com/recursos/131/4221007/imagen_1_1546953112.jpg",
  caracteristicas: {
    velocidad: 2,
    resistencia: 2,
    FechaCeCreacion: "2021-11-10",
  },
};
const robotUpdate = {
  _id: "61880b4a2cdcee28629fbab6",
  nombre: "robotUpdate",
  imagenUrl:
    "https://cloud.educaplay.com/recursos/131/4221007/imagen_1_1546953112.jpg",
  caracteristicas: {
    velocidad: 6,
    resistencia: 6,
    FechaCeCreacion: "2021-11-10",
  },
  __v: 0,
};

beforeAll(async () => {
  await connectDB(process.env.MONGODB_STRING_TEST);
  server = await iniciarServidor(4002);
  debug(chalk.yellowBright("Iniciar Servidor"));
  const response = await request(app)
    .post("/users/login")
    .send({
      nombre: "Sergio",
      contraseña: "Sergio_Entrar",
    })
    .expect(200);
  debug(chalk.yellowBright("Resultado de user!"));
  token = JSON.parse(response.text).user;
  debug(chalk.green(token));
});

beforeEach(async () => {
  await Robot.create(robotPrueba1);
  await Robot.create(robotPrueba2);
  debug(chalk.yellowBright("Envio! Robot"));
});

afterEach(async () => {
  await Robot.deleteMany({});
  debug(chalk.red("Borro robots!!"));
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
  debug(chalk.red("Cerrar Servidor"));
});

describe("Given a robotsRoutes", () => {
  describe("When it receives get on /robots", () => {
    test("Then it should return a list of robots", async () => {
      const { body } = await request(app)
        .get("/robots")
        .set("Authorization", `Bearer ${token}`);

      debug(chalk.yellowBright("Resultado de get robots!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body[0]).toHaveProperty("nombre", "robotPrueba1");
      expect(body[0]).toHaveProperty("id", "6187ec0fbbc7bceb2ea0e1ac");
    });
  });
});

describe("Given a robotsRoutes", () => {
  describe("When it receives get on /robots/6187ec0fbbc7bceb2ea0e1ac", () => {
    test("Then it should return a robot with id 6187ec0fbbc7bceb2ea0e1ac", async () => {
      const { body } = await request(app)
        .get("/robots/6187ec0fbbc7bceb2ea0e1ac")
        .set("Authorization", `Bearer ${token}`);

      debug(chalk.yellowBright("Resultado de get robots by id!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body).toHaveProperty("nombre", "robotPrueba1");
      expect(body).toHaveProperty("id", "6187ec0fbbc7bceb2ea0e1ac");
    });
  });
  describe("When it receives get on /robots/6187ec0fbbc7breb2ea0e1ac and id is wrong", () => {
    test("Then it should return a error code 400 and message Datos erroneos! ", async () => {
      const { body } = await request(app)
        .get("/robots/6187ec0fbbc7breb2ea0e1ac")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      debug(chalk.yellowBright("Resultado de get robots by wrong id!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body).toHaveProperty("error", "Datos erroneos!");
    });
  });
});

describe("Given a robotsRoutes", () => {
  describe("When it receives delete on /robots/delete/6187ec0fbbc7bceb2ea0e1ac", () => {
    test("Then it should delete a robots with id 6187ec0fbbc7bceb2ea0e1ac", async () => {
      const { body } = await request(app)
        .delete("/robots/delete/6187ec0fbbc7bceb2ea0e1ac")
        .set("Authorization", `Bearer ${token}`);

      debug(chalk.yellowBright("Resultado de delete robots!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body).toHaveProperty("id", "6187ec0fbbc7bceb2ea0e1ac");
    });
  });
  describe("When it receives delete on /robots/delete/6187ec0fbbc7bfeb2ea0e1ac and id is wrong", () => {
    test("Then it should return a error code 400 and message Datos erroneos! ", async () => {
      const { body } = await request(app)
        .delete("/robots/delete/6187ec0fbbc7bfeb2ea0e1ac")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      debug(chalk.yellowBright("Resultado de delete robots and id is wrong!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body).toHaveProperty("error", "Id no valida para borrar!");
    });
  });
});

describe("Given a robotsRoutes", () => {
  describe("When it receives delete on /robots/create", () => {
    test("Then it should create a robots", async () => {
      const { body } = await request(app)
        .post("/robots/create")
        .set("Authorization", `Bearer ${token}`)
        .send(robotCrear);

      debug(chalk.yellowBright("Resultado de crear robot!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body).toHaveProperty("nombre", "robotCrear");
    });
  });
});

describe("Given a robotsRoutes", () => {
  describe("When it receives update on /robots/update", () => {
    test("Then it should update a robots with same id", async () => {
      const { body } = await request(app)
        .put("/robots/update")
        .set("Authorization", `Bearer ${token}`)
        .send(robotUpdate);

      debug(chalk.yellowBright("Resultado de update robot!"));
      debug(chalk.green(JSON.stringify(body)));

      expect(body).toHaveProperty("nombre", "robotUpdate");
      expect(body.caracteristicas).toHaveProperty("velocidad", 6);
      expect(body.caracteristicas).toHaveProperty("resistencia", 6);
    });
  });
});
