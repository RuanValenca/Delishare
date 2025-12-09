import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import loginRouter from "./routes/login";
import usersRouter from "./routes/users";
import recipesRouter from "./routes/recipes";
import feedRouter from "./routes/feed";

const app = express();

const allowedOrigin = "https://delishare-app.netlify.app";

app.use(
  cors({
    origin: allowedOrigin,
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,X-Requested-With,Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors());
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
