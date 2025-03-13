const mongoose = require("mongoose");

const AIRecommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recommendation: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AIRecommendation", AIRecommendationSchema);
