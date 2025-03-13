const mongoose = require("mongoose");

const FocusSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    duration: { type: Number, required: true }, // En minutos
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FocusSession", FocusSessionSchema);
