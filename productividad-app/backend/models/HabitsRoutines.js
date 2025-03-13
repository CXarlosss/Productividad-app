const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    frequency: { type: String, enum: ["diario", "semanal", "mensual"], required: true },
    completedDays: [{ type: Date }]
});

module.exports = mongoose.model("Habit", HabitSchema);
