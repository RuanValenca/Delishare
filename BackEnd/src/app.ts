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
    origin: (origin, callback) => {
      // Permite requisições sem origem em desenvolvimento (Postman, etc)
      if (!origin) {
        if (process.env.NODE_ENV !== "production") {
          return callback(null, true);
        }
        return callback(new Error("Origem não permitida"));
      }

      // Permite a origem específica do Netlify
      if (origin === "https://delishare-app.netlify.app") {
        return callback(null, true);
      }

      // Permite qualquer subdomínio do Netlify
      if (origin.includes(".netlify.app")) {
        return callback(null, true);
      }

      // Permite localhost em desenvolvimento
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }

      console.warn(`⚠️  CORS bloqueado para origem: ${origin}`);
      callback(new Error("Não permitido pelo CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

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
