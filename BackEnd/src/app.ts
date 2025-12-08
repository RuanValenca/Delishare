import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import loginRouter from "./routes/login";
import usersRouter from "./routes/users";
import recipesRouter from "./routes/recipes";
import feedRouter from "./routes/feed";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: ["https://delishare-app.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.options("/*", cors(corsOptions));

// Logs e parsing
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
console.log("📁 Servindo arquivos estáticos de:", publicPath);

// Rotas
app.use("/", loginRouter);
app.use("/user", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/feed", feedRouter);

// Rota 404
app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;
