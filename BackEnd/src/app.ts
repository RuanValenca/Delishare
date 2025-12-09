import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import loginRouter from "./routes/login";
import usersRouter from "./routes/users";
import recipesRouter from "./routes/recipes";
import feedRouter from "./routes/feed";

const app = express();

app.use(
  cors({
    origin: ["https://delishare-app.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
  })
);

// Middlewares na ordem correta
app.use(morgan("dev")); // Logs primeiro
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Log para debug
app.use((req, res, next) => {
  try {
    next();
  } catch (e) {
    console.error("Erro antes das rotas:", e);
    res.status(500).json({ error: "Quebra antes do router" });
  }
});

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/login", loginRouter);
app.use("/user", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/feed", feedRouter);

app.use((err: Error, _req: Request, res: Response) => {
  console.error("❌ Erro não tratado:", err);
  if (!res.headersSent) {
    res.status(500).json({
      error: "Erro interno do servidor",
      message:
        process.env.NODE_ENV === "production"
          ? "Erro interno do servidor"
          : err.message,
    });
  }
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;
