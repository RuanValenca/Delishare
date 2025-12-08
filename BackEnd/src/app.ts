import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

import loginRouter from "./routes/login";
import usersRouter from "./routes/users";
import recipesRouter from "./routes/recipes";
import feedRouter from "./routes/feed";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// ------------------------
// ✅ CORS completo
// ------------------------
app.use((req, res, next) => {
  const allowedOrigin = "https://delishare-app.netlify.app";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // Responde qualquer preflight OPTIONS
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
});

// ------------------------
// Logs
// ------------------------
app.use(morgan("dev"));

// ------------------------
// Parsers
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------
// Arquivos estáticos
// ------------------------
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
console.log("📁 Servindo arquivos estáticos de:", publicPath);

// ------------------------
// Rotas
// ------------------------
app.use("/login", loginRouter);
app.use("/user", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/feed", feedRouter);

// ------------------------
// Rota 404
// ------------------------
app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;
