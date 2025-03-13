const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    completada: { type: Boolean, default: false },
});

module.exports = mongoose.model("Tarea", tareaSchema);
