import connection from "../../db/connection";

export const fetchAllProfiles = async () => {
  try {
    const result = await connection.query("SELECT * FROM profiles;");
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching profiles: ${(err as Error).message}`);
  }
};
