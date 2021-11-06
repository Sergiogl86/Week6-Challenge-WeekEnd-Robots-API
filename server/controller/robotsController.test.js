const Robot = require("../../database/models/robots");
const { getRobots } = require("./robotsController");

jest.mock("../../database/models/robots");

describe("Given a getRobots controller", () => {
  describe("When it receives a response, res", () => {
    test("Then it should call the method json with a response, res", async () => {
      const robots = [
        {
          caracteristicas: {
            velocidad: 100,
            resistencia: 70,
            FechaCeCreacion: "12-05-2018",
          },
          _id: "61857589666bcb02723c195c",
          nombre: "WALL·E",
          imagenUrl:
            "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
        },
        {
          caracteristicas: {
            velocidad: 6,
            resistencia: 7,
            FechaCeCreacion: "12-05-2018",
          },
          _id: "61858347666bcb02723c195d",
          nombre: "WALL·E 2",
          imagenUrl:
            "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
        },
        {
          caracteristicas: {
            velocidad: 6,
            resistencia: 7,
            FechaCeCreacion: "12-05-2018",
          },
          _id: "61858354666bcb02723c195e",
          nombre: "WALL·E 3",
          imagenUrl:
            "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
        },
      ];

      Robot.find = jest.fn().mockResolvedValue(robots);

      const res = { json: jest.fn() };

      await getRobots(null, res, null);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
  describe("When getRobots rejects, res", () => {
    test("Then it should call the method json with a error rejected", async () => {
      const error = {};

      Robot.find = jest.fn().mockRejectedValue(error);

      const req = {};
      const res = {};
      const next = jest.fn();

      await getRobots(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});
