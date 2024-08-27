import connection from "../../db/connection";

export const fetchAllDecks = async () => {
  try {
    const result = await connection.query("SELECT * FROM decks;");
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching decks: ${(err as Error).message}`);
  }
};
