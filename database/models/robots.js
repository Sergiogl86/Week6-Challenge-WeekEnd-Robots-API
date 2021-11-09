const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  imagenUrl: {
    type: String,
    required: true,
  },
  caracteristicas: {
    velocidad: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    resistencia: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    FechaCeCreacion: {
      type: String,
      required: true,
    },
  },
});

const Robot = model("robot", robotSchema);

module.exports = Robot;
