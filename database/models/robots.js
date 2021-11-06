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

robotSchema.method("transform", function () {
  const obj = this.toObject();

  // Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

const Robot = model("robot", robotSchema);

module.exports = Robot;
