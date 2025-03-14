const express = require("express");
const AIRecommendation = require("../models/AIRecomendations");

const router = express.Router();

// 🔍 Obtener todas las recomendaciones
router.get("/", async (req, res) => {
    try {
        const recomendaciones = await AIRecommendation.find().populate("usuario");
        res.json(recomendaciones);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo recomendaciones" });
    }
});

// ➕ Agregar una nueva recomendación
// @ts-ignore
router.post("/", async (req, res) => {
    const { usuario, recomendacion } = req.body;

    if (!usuario || !recomendacion) {
        return res.status(400).json({ message: "Usuario y recomendación son obligatorios" });
    }

    try {
        const nuevaRecomendacion = new AIRecommendation({ usuario, recomendacion });
        await nuevaRecomendacion.save();
        res.status(201).json(nuevaRecomendacion);
    } catch (error) {
        res.status(500).json({ message: "Error guardando la recomendación" });
    }
});

// ❌ Eliminar una recomendación
router.delete("/:id", async (req, res) => {
    try {
        await AIRecommendation.findByIdAndDelete(req.params.id);
        res.json({ message: "Recomendación eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando la recomendación" });
    }
});

module.exports = router;
