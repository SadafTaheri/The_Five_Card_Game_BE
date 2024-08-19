const db = require("../connection");
const format = require("pg-format");

interface accountInput {
    account_name: string;
    password: string;
}

interface abilityInput {
    name: string;
    description: string;
    type: string;
    strength: number;
    image_url: string;
    ability_cost: number;
}

interface characterInput {
    name: string;
    health: number;
    damage: number;
    point_cost: number;
    shop_cost: number;
    ability_id: number;
    image_url: string;
}

interface deckInput {
    name: string;
    profile_id: number;
    characters: Array<number>;
}

interface profileInput {
    account_id: number;
    username: string;
    currency: number;
    collection: Array<number>;
}

const seed = (
    accounts_data: Array<accountInput>,
    profiles_data: Array<profileInput>,
    abilities_data: Array<abilityInput>,
    characters_data: Array<characterInput>,
    decks_data: Array<deckInput>
) => {
    return db
        .query(`DROP TABLE IF EXISTS decks_x_characters;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS profiles_x_characters;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS decks;`);
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
            CREATE TYPE ability_type AS ENUM ('heal' , 'attack');
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
          account_id INT REFERENCES accounts(account_id) ON DELETE CASCADE,
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
      profile_id INT REFERENCES profiles(profile_id) ON DELETE CASCADE
      )
      `
            );
        })
        .then(() => {
            return db.query(`
      CREATE TABLE profiles_x_characters(
      id SERIAL PRIMARY KEY,
      profile_id INT REFERENCES profiles(profile_id) ON DELETE CASCADE,
      character_id INT REFERENCES characters(character_id)
      )
      `);
        })
        .then(() => {
            return db.query(`
      CREATE TABLE decks_x_characters(
      id SERIAL PRIMARY KEY,
      deck_id INT REFERENCES decks(deck_id) ON DELETE CASCADE,
      character_id INT REFERENCES characters(character_id)
      )
      `);
        })
        .then(() => {
            const queryStr: object = format(
                `
                INSERT INTO accounts(account_name, password)
                    VALUES %L
                `,
                accounts_data.map((account: accountInput) => [
                    account.account_name,
                    account.password,
                ])
            );
            return db.query(queryStr);
        })
        .then(() => {
            const queryStr: object = format(
                `
                INSERT INTO abilities (name, description, type, strength, image_url, ability_cost)
                    VALUES %L
                `,
                abilities_data.map((ability: abilityInput) => [
                    ability.name,
                    ability.description,
                    ability.type,
                    ability.strength,
                    ability.image_url,
                    ability.ability_cost,
                ])
            );
            return db.query(queryStr);
        })
        .then(() => {
            const queryStr: object = format(
                `
                INSERT INTO characters (name, health, damage, point_cost, shop_cost, ability_id, image_url)
                    VALUES %L
                `,
                characters_data.map((character: characterInput) => [
                    character.name,
                    character.health,
                    character.damage,
                    character.point_cost,
                    character.shop_cost,
                    character.ability_id,
                    character.image_url,
                ])
            );
            return db.query(queryStr);
        })
        .then(() => {
            const queryStr: object = format(
                `
                INSERT INTO profiles (account_id, username, currency)
                    VALUES %L
                `,
                profiles_data.map((profile: profileInput) => [
                    profile.account_id,
                    profile.username,
                    profile.currency,
                ])
            );
            return db.query(queryStr);
        })
        .then(() => {
            const queryStr: object = format(
                `
                INSERT INTO decks (name, profile_id)
                    VALUES %L
                    RETURNING *
                `,
                decks_data.map((deck: deckInput) => [
                    deck.name,
                    deck.profile_id,
                ])
            );
            return db.query(queryStr);
        })
        .then((tableData: any) => {
            const insertArray: Array<object> = [];
            decks_data.forEach((inputDeck: deckInput) => {
                const deck_id = tableData.rows.find(
                    (tableDeck: any) =>
                        tableDeck.name === inputDeck.name &&
                        tableDeck.profile_id === Number(inputDeck.profile_id)
                ).deck_id;

                inputDeck.characters.forEach((character_id: number) => {
                    insertArray.push([deck_id, character_id]);
                });
            });

            const queryStr: object = format(
                `INSERT INTO decks_x_characters (deck_id, character_id)
                    VALUES %L`,
                insertArray
            );

            return db.query(queryStr);
        })
        .then(() => {
            const insertArray: Array<object> = [];
            profiles_data.forEach((profile) =>
                profile.collection.forEach((character_id) =>
                    insertArray.push([profile.account_id, character_id])
                )
            );

            const queryStr: object = format(
                `
                INSERT INTO profiles_x_characters (profile_id, character_id)
                    VALUES %L
                `,
                insertArray
            );
            return db.query(queryStr);
        });
};

module.exports = seed;
