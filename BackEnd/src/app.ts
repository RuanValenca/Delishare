import express from "express";
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

// Configuração de CORS
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Permite requisições sem origem (mobile apps, Postman, etc) em desenvolvimento
    if (!origin && process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    // Permite qualquer subdomínio do Netlify
    if (origin && origin.includes(".netlify.app")) {
      return callback(null, true);
    }

    // Verifica se a origem está na lista de permitidas
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (origin) {
      console.warn(`⚠️  CORS bloqueado para origem: ${origin}`);
      callback(new Error("Não permitido pelo CORS"));
    } else {
      callback(null, true);
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
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use("/login", loginRouter);
app.use("/user", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/feed", feedRouter);

// Middleware de tratamento de erros
app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error("❌ Erro não tratado:", err);
  if (!res.headersSent) {
    res.status(500).json({
      error: "Erro interno do servidor",
      message: err.message,
    });
  }
});

// Rota 404
app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;
