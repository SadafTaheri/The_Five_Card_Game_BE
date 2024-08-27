import db from "../../db/connection";

export const getDeckWithCharacters = async (deck_id: number) => {
  const deckQuery = `
    SELECT d.deck_id, d.name, d.profile_id
    FROM decks d
    WHERE d.deck_id = $1
  `;

  const charactersQuery = `
    SELECT c.character_id, c.name, c.health, c.damage, c.point_cost, c.shop_cost, c.image_url
    FROM characters c
    JOIN decks_x_characters dxc ON c.character_id = dxc.character_id
    WHERE dxc.deck_id = $1
  `;

  const deckResult = await db.query(deckQuery, [deck_id]);
  const charactersResult = await db.query(charactersQuery, [deck_id]);

  if (deckResult.rows.length === 0) {
    throw {
      status: 404,
      msg: `Deck with ID ${deck_id} not found`,
    };
  }

  return {
    deck: deckResult.rows[0],
    characters: charactersResult.rows,
  };
};
