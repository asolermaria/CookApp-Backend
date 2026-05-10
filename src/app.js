// Importamos dependencias
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Importamos rutas
const authRoutes = require("./routes/authRoutes")

//Conexión con BBDD MongoDB
const connectMongo = require ("./config/db_mongo")
connectMongo()

const app = express();
const PORT = process.env.PORT || 3000;

// Usamos dependencias
app.use(express.json());
app.use(cookieParser());

// Usamos rutas
app.use("/api/auth", authRoutes)

// Prueba funcionamiento server
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running",
    uptime: process.uptime(), // Tiempo que el servidor lleva levantado
    timeStamp: new Date().toISOString() // ISO lectura de máquinas 2026-04-22 UTM
  })
})

// Manejo error 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});