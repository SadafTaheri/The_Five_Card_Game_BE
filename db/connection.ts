// const { Pool } = require("pg");
// const ENV: string = process.env.NODE_ENV || "development";

// require("dotenv").config({
//     path: `${__dirname}/../../env/.env.${ENV}`,
// });

// if (!process.env.PGDATABASE) {
//     throw new Error("PGDATABASE not set");
// }

// const connection = new Pool();

// export default connection
//===============
// const { Pool } = require("pg");
// import dotenv from "dotenv";

// dotenv.config({
//   path: `${__dirname}/../../env/.env.${process.env.NODE_ENV || "development"}`,
// });

// if (!process.env.PGDATABASE) {
//   throw new Error("PGDATABASE not set");
// }

// const pool = new Pool({
//   database: process.env.PGDATABASE,
//   // Include other configurations like user, host, port if necessary
// });

// export default pool;

// import { Pool } from "pg";
// import dotenv from "dotenv";

// Load environment variables from .env file
// dotenv.config();

// if (!process.env.PGDATABASE) {
//   throw new Error("PGDATABASE not set");
// }

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: parseInt(process.env.PGPORT || "5432", 10),
// });

// export default pool;

import { Pool } from "pg";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// This is correct
const ENV = process.env.NODE_ENV || "development";

// This check is implemented correctly
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config: any = {};

// Production configuration is correct
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2; // This is fine, limiting connections for free tier databases
} else {
  // These are additional configs for non-production. Ensure these env vars are set in your dev/test environments
  config.user = process.env.PGUSER;
  config.host = process.env.PGHOST;
  config.database = process.env.PGDATABASE;
  config.password = process.env.PGPASSWORD;
  config.port = parseInt(process.env.PGPORT || "5432", 10);
}

const pool = new Pool(config);

export default pool;
