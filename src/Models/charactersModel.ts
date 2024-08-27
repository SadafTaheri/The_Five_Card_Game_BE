import connection from "../../db/connection";

export const fetchAllCharacters = async () => {
  try {
    const result = await connection.query("SELECT * FROM characters;");
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching characters: ${(err as Error).message}`);
  }
};
