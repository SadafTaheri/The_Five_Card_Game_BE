import connection from "../../db/connection";

export const fetchAllAccounts = async () => {
  try {
    const result = await connection.query("SELECT * FROM accounts;");
    return result.rows; // Return the rows from the query
  } catch (err) {
    throw new Error(`Error fetching accounts: ${(err as Error).message}`);
  }
};
