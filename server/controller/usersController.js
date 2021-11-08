const debug = require("debug")("robots:usersController");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/users");

const createUser = async (req, res, next) => {
  try {
    debug(chalk.green("creandoUsuario"));
    const user = await User.create({
      nombre: "Sergio",
      usuario: "Sergio_Usuario",
      contraseña: await bcrypt.hash("Sergio_Entrar", 10),
    });
    res.json(user);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!!";
    next(error);
  }
};

const getusers = async (req, res, next) => {
  try {
    const users = await User.find();
    debug(chalk.red("Haciendo el get a /"));
    res.json(users);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { nombre, contraseña } = req.body;
  debug(chalk.green("loginUser"));
  debug(chalk.green(nombre));
  debug(chalk.green(contraseña));
  const user = await User.findOne({ nombre });
  debug(chalk.green(user));
  if (!user) {
    const error = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const contraseñaOK = await bcrypt.compare(contraseña, user.contraseña);
    debug(chalk.green(contraseñaOK));
    if (!contraseñaOK) {
      const error = new Error("Wrong credentials");
      error.code = 401;
      next(error);
    } else {
      debug(chalk.green("Seguimos!"));
      const token = jwt.sign(
        {
          id: user.id,
          name: user.nombre,
        },
        process.env.ROBOTS_HASH,
        {
          expiresIn: 24 * 60 * 60,
        }
      );
      res.json({ user: token });
    }
  }
};

module.exports = {
  getusers,
  createUser,
  loginUser,
};
