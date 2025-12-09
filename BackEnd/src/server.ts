import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { pool } from "./db";

const PORT = process.env.PORT || 3000;

console.log("NODE_ENV:", process.env.NODE_ENV || "undefined");
console.log("PORT:", PORT);
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "OK" : "UNDEFINED");

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Banco conectado");

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Falha ao conectar no banco:", err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Erro não tratado:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Exceção não tratada:", err);
  process.exit(1);
});

startServer();
