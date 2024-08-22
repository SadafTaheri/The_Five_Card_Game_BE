import connection from "../../db/connection";

export const fetchCharacterById = async (character_id: number) => {
  const query = `
    SELECT 
      characters.name AS character_name,
      characters.health,
      characters.damage,
      characters.point_cost,
      characters.image_url,
      abilities.name AS ability_name,
      abilities.description AS ability_description,
      abilities.type AS ability_type,
      abilities.strength AS ability_strength,
      abilities.ability_cost
    FROM characters
    JOIN abilities ON characters.ability_id = abilities.ability_id
    WHERE characters.character_id = $1;
  `;
  const { rows } = await connection.query(query, [character_id]);
  return rows[0];
};
