const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/users");
require("dotenv").config();
const { loginUser } = require("./usersController");

jest.mock("../../database/models/users");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a loginUser controller", () => {
  describe("When it receives req.body with user and Key", () => {
    test("Then it should return a Token", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        id: "2",
        nombre: "Alguien",
        contraseña: "Entrar",
      });

      bcrypt.compare = jest.fn().mockReturnValue(true);

      jwt.sign = jest.fn().mockReturnValue("Token");

      const req = {
        body: {
          nombre: "Sergio",
          contraseña: "Sergio_Entrar",
        },
      };

      const res = { json: jest.fn() };

      const next = jest.fn();

      const expectedToken = { user: "Token" };

      await loginUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedToken);
    });
  });
});
