const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea"); // Importa el modelo de tareas

// ✅ Obtener todas las tareas
router.get("/", async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas", error });
    }
});

// ➕ Agregar nueva tarea
router.post("/", async (req, res) => {
    try {
        const nuevaTarea = new Tarea({
            texto: req.body.texto,
            completada: req.body.completada || false,
        });

        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar tarea", error });
    }
});

// ✅ Marcar tarea como completada
// @ts-ignore
router.put("/:id", async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(
            req.params.id,
            { completada: req.body.completada },
            { new: true }
        );

        if (!tareaActualizada) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarea", error });
    }
});

// ❌ Eliminar tarea
// @ts-ignore
router.delete("/:id", async (req, res) => {
    try {
        const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);

        if (!tareaEliminada) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarea", error });
    }
});

module.exports = router;
