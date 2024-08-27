import connection from "../../db/connection";

export const fetchAllDecksCharacters = async () => {
  try {
    const result = await connection.query("SELECT * FROM decks_x_characters;");
    return result.rows;
  } catch (err) {
    throw new Error(
      `Error fetching decks_x_characters: ${(err as Error).message}`
    );
  }
};
