import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { pool } from "./db";

dotenv.config();

const PORT = process.env.PORT || 3000;

pool
  .query("SELECT NOW()")
  .then(() => console.log("✅ Supabase conectado"))
  .catch((err) => console.error("❌ Erro ao conectar no Supabase", err));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
