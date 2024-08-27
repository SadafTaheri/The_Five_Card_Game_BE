import connection from "../../db/connection";

export const fetchAllAbilities = async () => {
  try {
    const result = await connection.query("SELECT * FROM abilities;");
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching abilities: ${(err as Error).message}`);
  }
};
