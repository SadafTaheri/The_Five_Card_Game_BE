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

import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || "5432", 10),
});

export default pool;
