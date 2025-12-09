import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import loginRouter from "./routes/login";
import usersRouter from "./routes/users";
import recipesRouter from "./routes/recipes";
import feedRouter from "./routes/feed";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  res.setHeader("Access-Control-Allow-Origin", "https://meusite.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("X-Server-Version", "1.0.0");
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

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
