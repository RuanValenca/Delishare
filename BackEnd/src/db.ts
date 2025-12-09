import { Pool } from "pg";

// Validação mais robusta da DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;
const hasDatabaseUrl =
  databaseUrl &&
  typeof databaseUrl === "string" &&
  databaseUrl.trim() !== "" &&
  (databaseUrl.includes("postgresql://") ||
    databaseUrl.includes("postgres://"));

if (!hasDatabaseUrl && !process.env.DB_HOST) {
  console.warn(
    "⚠️  DATABASE_URL ou DB_HOST não configurados. Verifique as variáveis de ambiente."
  );
}

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

export const pool = new Pool(connectionConfig);
