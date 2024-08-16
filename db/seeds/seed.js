var db = require("../connection");
//accounts
// profiles
// abilities
// decks
// characters
var seed = function () {
    return db
        .query("DROP TABLE IF EXISTS decks;")
        .then(function () {
        return db.query("DROP TABLE IF EXISTS profiles_x_characters;");
    })
        .then(function () {
        return db.query("DROP TABLE IF EXISTS decks_x_characters;");
    })
        .then(function () {
        return db.query("DROP TABLE IF EXISTS profiles;");
    })
        .then(function () {
        return db.query("DROP TABLE IF EXISTS characters;");
    })
        .then(function () {
        return db.query("DROP TABLE IF EXISTS abilities;\n        DROP TYPE ability_type;\n        ");
    })
        .then(function () {
        return db.query("DROP TABLE IF EXISTS accounts;");
    })
        .then(function () {
        return db.query("CREATE TABLE accounts (\n            account_id SERIAL PRIMARY KEY,\n            account_name VARCHAR NOT NULL,\n            password VARCHAR NOT NULL\n            )");
    })
        .then(function () {
        return db.query("\n            CREATE TYPE ability_type AS ENUM ('Heal' , 'Attack');\n            CREATE TABLE abilities (\n            ability_id SERIAL PRIMARY KEY,\n            name VARCHAR NOT NULL,\n            description TEXT NOT NULL,\n            type ability_type NOT NULL,\n            strength INT NOT NULL,\n            image_url TEXT,\n            ability_cost INT \n            )");
    })
        // .then(() => {
        //   return db.query(`
        //         CREATE TABLE characters (
        //         character_id SERIAL PRIMARY KEY,
        //         name VARCHAR NOT NULL,
        //         health INT NOT NULL,
        //         damage INT NOT NULL,
        //         point_cost INT NOT NULL,
        //         shop_cost INT NOT NULL,
        //         ability_id REFERENCES abilities(ability_id),
        //         image_url TEXT NOT NULL
        //         )
        //         `);
        // })
        .then(function () {
        return db.query("\n              CREATE TABLE profiles (\n              profile_id SERIAL PRIMARY KEY,\n              account_id REFERENCES accounts(account_id),\n              username VARCHAR NOT NULL,\n              currency INT DEFAULT 2000 NOT NULL\n              )\n          ");
    })
        .then(function () {
        return db.query("\n          CREATE TABLE decks (\n          deck_id SERIAL PRIMARY KEY,\n          name VARCHAR NOT NULL,\n          profile_id REFERENCES profiles(profile_id)\n          )\n          ");
    })
        .then(function () {
        return db.query("\n          CREATE TABLE profiles_x_characters(\n          id SERIAL PRIMARY KEY,\n          profile_id REFERENCES profiles(profile_id),\n          character_id REFERENCES characters(character_id)\n          )\n          ");
    })
        .then(function () {
        return db.query("\n          CREATE TABLE decks_x_characters(\n          id SERIAL PRIMARY KEY,\n          deck_id REFERENCES decks(deck_id),\n          character_id REFERENCES characters(character_id)\n          )\n          ");
    });
};
module.exports = seed;
