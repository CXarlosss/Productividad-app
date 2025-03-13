const express = require('express');
const router = express.Router();

// Ruta para obtener sesiones de enfoque
router.get('/', (req, res) => {
    res.json({ message: "🎯 API de sesiones de enfoque funcionando!" });
});

module.exports = router;
