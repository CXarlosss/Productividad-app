// @ts-nocheck
import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

// 🔹 Config
dotenv.config();
const app = express();
const router = Router();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB Setup
const URI = process.env.MONGO_ATLAS || "mongodb://localhost:27017";
const dbName = "React";
const client = new MongoClient(URI);

async function connectDB() {
  if (!client.topology || client.topology.s.state !== "connected") {
    await client.connect();
  }
  return client.db(dbName);
}

// 📌 Exportar para otros archivos si es necesario
export { connectDB, ObjectId };

// Importamos las rutas
const userRoutes = require("../../productividad-app/backend/routes/user");
const activityRoutes = require("../../productividad-app/backend/routes/userActivity");
const habitsRoutes = require("../../productividad-app/backend/routes/habits");
const focusRoutes = require("../../productividad-app/backend/routes/focusSessions.js");
const recommendationsRoutes = require("../../productividad-app/backend/routes/aiRecomendations");
const tareasRoutes = require("../../productividad-app/backend/routes/tareas.js");

router.use("/api/users", userRoutes);
router.use("/api/activity", activityRoutes);
router.use("/api/habits", habitsRoutes);
router.use("/api/focus", focusRoutes);
router.use("/api/recommendations", recommendationsRoutes);
router.use("/api/tareas", tareasRoutes);



// Ruta para servir la página de tareas
router.get("/tareas", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/tareas.html"));
});














// 🔹 Iniciar el servidor

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
