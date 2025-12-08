import { Pool } from "pg";

const hasDatabaseUrl =
  process.env.DATABASE_URL &&
  typeof process.env.DATABASE_URL === "string" &&
  process.env.DATABASE_URL.trim() !== "" &&
  process.env.DATABASE_URL.includes("postgresql://");

const connectionConfig = hasDatabaseUrl
  ? {
      connectionString: process.env.DATABASE_URL,
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
