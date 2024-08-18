const db = require("../connection");

//accounts
// profiles
// abilities
// decks
// characters
const seed = () => {
    return db
        .query(`DROP TABLE IF EXISTS decks;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS profiles_x_characters;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS decks_x_characters;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS profiles;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS characters;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS abilities;
        DROP TYPE IF EXISTS ability_type;
        `);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS accounts;`);
        })
        .then(() => {
            return db.query(`CREATE TABLE accounts (
            account_id SERIAL PRIMARY KEY,
            account_name VARCHAR NOT NULL,
            password VARCHAR NOT NULL
            )`);
        })
        .then(() => {
            return db.query(
                `
            CREATE TYPE ability_type AS ENUM ('Heal' , 'Attack');
            CREATE TABLE abilities (
            ability_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            description TEXT NOT NULL,
            type ability_type NOT NULL,
            strength INT NOT NULL,
            image_url TEXT,
            ability_cost INT
            )`
            );
        })
        .then(() => {
            return db.query(`
        CREATE TABLE characters (
        character_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        health INT NOT NULL,
        damage INT NOT NULL,
        point_cost INT NOT NULL,
        shop_cost INT NOT NULL,
        ability_id INT REFERENCES abilities(ability_id),
        image_url TEXT NOT NULL
        )
        `);
        })
        .then(() => {
            return db.query(`
          CREATE TABLE profiles (
          profile_id SERIAL PRIMARY KEY,
          account_id INT REFERENCES accounts(account_id),
          username VARCHAR NOT NULL,
          currency INT DEFAULT 2000 NOT NULL
          )
      `);
        })
        .then(() => {
            return db.query(
                `
      CREATE TABLE decks (
      deck_id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      profile_id INT REFERENCES profiles(profile_id)
      )
      `
            );
        })
        .then(() => {
            return db.query(`
      CREATE TABLE profiles_x_characters(
      id SERIAL PRIMARY KEY,
      profile_id INT REFERENCES profiles(profile_id),
      character_id INT REFERENCES characters(character_id)
      )
      `);
        })
        .then(() => {
            return db.query(`
      CREATE TABLE decks_x_characters(
      id SERIAL PRIMARY KEY,
      deck_id INT REFERENCES decks(deck_id),
      character_id INT REFERENCES characters(character_id)
      )
      `);
        });
};

module.exports = seed;
