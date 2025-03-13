const express = require('express');
const router = express.Router();

// Ruta para obtener recomendaciones de IA
router.get('/', (req, res) => {
    res.json({ message: "🤖 API de recomendaciones de IA funcionando!" });
});

module.exports = router;
