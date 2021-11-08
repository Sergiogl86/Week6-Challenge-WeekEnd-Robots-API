const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

const User = model("user", userSchema);

module.exports = User;
