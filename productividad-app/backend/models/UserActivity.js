const mongoose = require("mongoose");

const UserActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["tarea", "evento", "sesion_foco"], required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserActivity", UserActivitySchema);
