// @ts-nocheck
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";

// Utilidades para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar entorno
dotenv.config();

// Express setup
const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

// MongoDB setup
const URI = process.env.MONGO_ATLAS || "mongodb://localhost:27017";
const dbName = "React";
const client = new MongoClient(URI);

async function connectDB() {
  if (!client.topology || client.topology.s.state !== "connected") {
    await client.connect();
  }
  return client.db(dbName);
}

// 🧩 Importar rutas adaptadas (deben usar `export default`)
import userRoutes from "../../productividad-app/backend/routes/user.js";
import activityRoutes from "../../productividad-app/backend/routes/userActivity.js";
import habitsRoutes from "../../productividad-app/backend/routes/habits.js";
import focusRoutes from "../../productividad-app/backend/routes/focusSessions.js";
import recommendationsRoutes from "../../productividad-app/backend/routes/aiRecomendations.js";
import tareasRoutes from "../../productividad-app/backend/routes/tareas.js";

// 🧩 Montar rutas
router.use("/users", userRoutes);
router.use("/activity", activityRoutes);
router.use("/habits", habitsRoutes);
router.use("/focus", focusRoutes);
router.use("/recommendations", recommendationsRoutes);
router.use("/tareas", tareasRoutes);

// 🧩 Endpoint de test
router.get("/", (req, res) => {
  res.send("🚀 API Serverless funcionando en Netlify");
});

// Aplicar rutas bajo la ruta base de Netlify
app.use("/.netlify/functions/api", router);

// Exportar como función serverless
export const handler = serverless(app);
