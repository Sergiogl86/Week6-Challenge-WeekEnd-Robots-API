const Robot = require("../../database/models/robots");
const {
  getRobots,
  getIdRobot,
  crearRobot,
  modificarRobot,
  deleteRobot,
} = require("./robotsController");

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

describe("Given a getIdRobot controller", () => {
  describe("When it receives req with idRobot", () => {
    test("Then it should call Robot.findOne with object _id: idRobot", async () => {
      const robot = {
        caracteristicas: {
          velocidad: 100,
          resistencia: 70,
          FechaCeCreacion: "12-05-2018",
        },
        _id: "61857589666bcb02723c195c",
        nombre: "WALL·E",
        imagenUrl:
          "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
      };

      const res = { json: jest.fn() };

      const req = {
        params: {
          idRobot: 3,
        },
      };

      Robot.findOne = jest.fn().mockResolvedValue(robot);

      await getIdRobot(req, res, null);

      expect(Robot.findOne).toHaveBeenCalledWith({ _id: 3 });
      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });
  describe("When getIdRobot rejects, res", () => {
    test("Then it should call the method json with a error rejected", async () => {
      const error = {};

      Robot.findOne = jest.fn().mockRejectedValue(error);

      const req = {
        params: {
          idRobot: 3,
        },
      };
      const res = {};
      const next = jest.fn();

      await getIdRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

describe("Given a crearRobot controller", () => {
  describe("When it receives req.body with Robot", () => {
    test("Then it should call Robot.create with Robot", async () => {
      const robot = {
        caracteristicas: {
          velocidad: 100,
          resistencia: 70,
          FechaCeCreacion: "12-05-2018",
        },
        _id: "61857589666bcb02723c195c",
        nombre: "WALL·E",
        imagenUrl:
          "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
      };

      const res = { json: jest.fn() };

      const req = {
        body: robot,
      };

      Robot.create = jest.fn().mockResolvedValue(robot);

      await crearRobot(req, res, null);

      expect(Robot.create).toHaveBeenCalledWith(robot);
      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });
  describe("When crearRobot  rejects, res", () => {
    test("Then it should call the method json with a error rejected", async () => {
      const error = {};

      Robot.create = jest.fn().mockRejectedValue(error);

      const req = {
        body: { none: null },
      };
      const res = {};
      const next = jest.fn();

      await crearRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

describe("Given a modificarRobot controller", () => {
  describe("When it receives req.body with Robot", () => {
    test("Then it should call Robot.findByIdAndUpdate with robot._id and Robot", async () => {
      const robot = {
        caracteristicas: {
          velocidad: 100,
          resistencia: 70,
          FechaCeCreacion: "12-05-2018",
        },
        _id: "61857589666bcb02723c195c",
        nombre: "WALL·E",
        imagenUrl:
          "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
      };

      const res = { json: jest.fn() };

      const req = {
        body: robot,
      };

      Robot.findByIdAndUpdate = jest.fn().mockResolvedValue({});

      await modificarRobot(req, res, null);

      expect(Robot.findByIdAndUpdate).toHaveBeenCalledWith(robot._id, robot, {
        runValidators: true,
      });
      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });
  describe("When modificarRobot rejects, res", () => {
    test("Then it should call the method json with a error rejected", async () => {
      const error = {};

      Robot.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      const robot = {
        caracteristicas: {
          velocidad: 100,
          resistencia: 70,
          FechaCeCreacion: "12-05-2018",
        },
        _id: "61857589666bcb02723c195c",
        nombre: "WALL·E",
        imagenUrl:
          "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
      };

      const res = { json: jest.fn() };

      const req = {
        body: robot,
      };

      const next = jest.fn();

      await modificarRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

describe("Given a deleteRobot controller", () => {
  describe("When it receives req with idRobot", () => {
    test("Then it should call Robot.deleteOne with idRobot", async () => {
      const res = { json: jest.fn() };

      const req = {
        params: {
          idRobot: 3,
        },
      };

      Robot.deleteOne = jest.fn().mockResolvedValue({});

      await deleteRobot(req, res, null);

      expect(Robot.deleteOne).toHaveBeenCalledWith({ _id: 3 });
      expect(res.json).toHaveBeenCalledWith({ _id: 3 });
    });
  });
  describe("When modificarRobot rejects, res", () => {
    test("Then it should call the method json with a error rejected", async () => {
      const error = {};

      Robot.deleteOne = jest.fn().mockRejectedValue(error);

      const res = { json: jest.fn() };

      const req = {
        params: {
          idRobot: 3,
        },
      };

      const next = jest.fn();

      await deleteRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});
