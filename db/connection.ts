const { Pool } = require("pg");
const ENV: string = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../env/.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = new Pool();


