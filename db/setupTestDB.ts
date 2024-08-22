import connection from "../db/connection";

export const setupTestDB = async () => {
  await connection.query(
    "CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name VARCHAR(255));"
  );
  // Create other tables or insert test data as needed
};

export const teardownTestDB = async () => {
  await connection.query("DROP TABLE IF EXISTS test_table;");
  // Drop other tables or clean up as needed
};
