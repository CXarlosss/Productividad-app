const express = require("express");
const UserActivity = require("../models/UserActivity");
const router = express.Router();

// Obtener todas las actividades
router.get("/", async (req, res) => {
    try {
        const activities = await UserActivity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
