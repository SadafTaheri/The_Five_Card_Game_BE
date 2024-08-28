import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Ensure dotenv is imported to load environment variables

const ENV = process.env.NODE_ENV || "development";
console.log(process.env.NODE_ENV, "<<<<<<<<<<<<<node_env");

require("dotenv").config({
  path: `${__dirname}/../../.env.${ENV}`,
});

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

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const pool = new Pool(config);

export default pool;
