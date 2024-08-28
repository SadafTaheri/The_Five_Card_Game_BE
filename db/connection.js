"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var ENV = process.env.NODE_ENV || "development";
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
var config = ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Needed for Heroku or Render
        },
        max: 2,
    }
    : {};
var pool = new pg_1.Pool(config);
exports.default = pool;
