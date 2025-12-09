import dotenv from "dotenv";

// Carrega variáveis de ambiente apenas em desenvolvimento
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import app from "./app";
import http from "http";
import { pool } from "./db";

const PORT = process.env.PORT || 3000;

// Testa conexão com o banco
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Banco de dados conectado");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no banco de dados:", err);
  });

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
});

// Tratamento de erros não capturados
process.on("unhandledRejection", (err) => {
  console.error("❌ Erro não tratado:", err);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Exceção não capturada:", err);
  process.exit(1);
});
