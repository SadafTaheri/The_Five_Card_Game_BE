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
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const ENV = process.env.NODE_ENV || "development";

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config: any = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2; // Adjust the max connections according to your database constraints
} else {
  config.user = process.env.PGUSER;
  config.host = process.env.PGHOST;
  config.database = process.env.PGDATABASE;
  config.password = process.env.PGPASSWORD;
  config.port = parseInt(process.env.PGPORT || "5432", 10);
}

const pool = new Pool(config);

export default pool;
