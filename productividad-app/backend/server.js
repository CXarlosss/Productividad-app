// @ts-check
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔹 Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Conexión con MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Pagina2";
mongoose.connect(MONGO_URI, {

})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar con MongoDB:", err));

// 📌 Definir rutas
app.get("/", (req, res) => {
    res.send("🚀 API de Productividad Pro en funcionamiento!");
});

// Importamos las rutas
const userRoutes = require("./routes/user");
const activityRoutes = require("./routes/userActivity");
const habitsRoutes = require("./routes/habits");
const focusRoutes = require("./routes/focusSessions.js");
const recommendationsRoutes = require("./routes/aiRecomendations");

app.use("/api/users", userRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/habits", habitsRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/recommendations", recommendationsRoutes);

// 🔹 Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
