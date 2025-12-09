import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import loginRouter from "./routes/login";
import usersRouter from "./routes/users";
import recipesRouter from "./routes/recipes";
import feedRouter from "./routes/feed";

const app = express();

// Configuração de CORS
const allowedOrigins = [
  "https://delishare-app.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem origem em desenvolvimento (Postman, etc)
    if (!origin) {
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("Origem não permitida"));
    }

    // Permite qualquer subdomínio do Netlify
    if (origin.includes(".netlify.app")) {
      return callback(null, true);
    }

    // Verifica se está na lista de permitidas
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS bloqueado para origem: ${origin}`);
      callback(new Error("Não permitido pelo CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  exposedHeaders: ["Content-Type"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Servidor está rodando",
    timestamp: new Date().toISOString(),
  });
});

// Rotas
app.use("/login", loginRouter);
app.use("/user", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/feed", feedRouter);

// Middleware de tratamento de erros
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

// Rota 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;
