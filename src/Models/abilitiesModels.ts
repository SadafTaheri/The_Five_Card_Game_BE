import connection from "../../db/connection";
// import {QueryResult} from 'pg';

export async function setAllAbilities() {
  const [rows] = await connection.query("SELECT * FROM users");
  return rows;
  // }catch (error){
  //     throw new Error('Database query failed: ' + error.message)
}
