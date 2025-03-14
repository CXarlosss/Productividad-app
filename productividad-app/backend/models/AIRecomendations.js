const mongoose = require("mongoose");
const AIRecommendationSchema = new mongoose.Schema({
    usuario: { type: String, required: true }, // 🔴 Prueba con un simple String en vez de ObjectId
    recomendacion: { type: String, required: true }
});


module.exports = mongoose.model("AIRecommendation", AIRecommendationSchema, "ai_recommendations");

