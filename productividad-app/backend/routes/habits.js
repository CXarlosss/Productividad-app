const express = require('express');
const router = express.Router();

// Ruta para obtener hábitos
router.get('/', (req, res) => {
    res.json({ message: "📌 API de hábitos funcionando!" });
});

module.exports = router;
