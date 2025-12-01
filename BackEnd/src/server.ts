import app from "./app";
import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
