import app from "./app";
import http from "http";
import { pool } from "./db";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

pool
  .query("SELECT NOW()")
  .then(() => console.log("✅ Supabase conectado"))
  .catch((err: string) =>
    console.error("❌ Erro ao conectar no Supabase", err)
  );

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
