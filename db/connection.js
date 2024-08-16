var Pool = require("pg").Pool;
var ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: "".concat(__dirname, "/../env/.env.").concat(ENV),
});
if (!process.env.PGDATABASE) {
    throw new Error("PGDATABASE not set");
}
module.exports = new Pool();
