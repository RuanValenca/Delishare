import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import loginRouter from "./routes/login";
import usersRouter from "./routes/users";
import recipesRouter from "./routes/recipes";
import feedRouter from "./routes/feed";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta public
// __dirname em runtime será backend/src, então public está em backend/src/public
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
console.log("📁 Servindo arquivos estáticos de:", publicPath);

// Rotas
app.use("/", loginRouter);
app.use("/user", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/feed", feedRouter);

// Erros
app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;
