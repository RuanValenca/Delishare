import { Pool } from "pg";

console.log(
  "DATABASE_URL NO DB.TS:",
  process.env.DATABASE_URL ? "OK" : "UNDEFINED"
);

// Validação da DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;

const hasDatabaseUrl =
  databaseUrl &&
  typeof databaseUrl === "string" &&
  databaseUrl.trim() !== "" &&
  (databaseUrl.includes("postgresql://") ||
    databaseUrl.includes("postgres://"));

// Configuração de conexão
const connectionConfig = hasDatabaseUrl
  ? {
      connectionString: databaseUrl.trim(),
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "postgres",
      port: Number(process.env.DB_PORT) || 5432,
      ssl:
        process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    };

// Aviso se não houver configuração
if (!hasDatabaseUrl && !process.env.DB_HOST) {
  console.warn(
    "⚠️  DATABASE_URL ou DB_HOST não configurados. Usando valores padrão."
  );
}

export const pool = new Pool(connectionConfig);

// Tratamento de erros do pool
pool.on("error", (err) => {
  console.error("❌ Erro inesperado no pool de conexões:", err);
});
