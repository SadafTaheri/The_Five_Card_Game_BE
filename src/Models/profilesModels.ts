import connection from "../../db/connection";

export const fetchAllProfiles = async () => {
  try {
    const result = await connection.query("SELECT * FROM profiles;");
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching profiles: ${(err as Error).message}`);
  }
};

export const insertProfile = async (
  account_id: number,
  username: string,
  currency: number
) => {
  try {
    const result = await connection.query(
      "INSERT INTO profiles (account_id, username, currency) VALUES ($1, $2, $3) RETURNING *;",
      [account_id, username, currency]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(`Error inserting profile: ${(err as Error).message}`);
  }
};

export const modifyProfile = async (
  profile_id: number,
  username: string,
  currency: number
) => {
  try {
    const result = await connection.query(
      "UPDATE profiles SET username = $2, currency = $3 WHERE profile_id = $1 RETURNING *;",
      [profile_id, username, currency]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(`Error updating profile: ${(err as Error).message}`);
  }
};
