import { Pool } from "pg";

const ENV = process.env.NODE_ENV || "development";

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // Needed for Heroku or Render
        },
        max: 2,
      }
    : {};

const pool = new Pool(config);

export default pool;
