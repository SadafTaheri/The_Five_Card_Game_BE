import connection from "../../db/connection";

export const fetchAllProfilesCharacters = async () => {
  try {
    const result = await connection.query(
      "SELECT * FROM profiles_x_characters;"
    );
    return result.rows;
  } catch (err) {
    throw new Error(
      `Error fetching profiles_x_characters: ${(err as Error).message}`
    );
  }
};
