import { Request, Response, NextFunction } from "express";
import db from "../../db/connection";

export const getDeckWithAbilitiesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { deck_id } = req.params;

  if (isNaN(Number(deck_id))) {
    console.error("Invalid deck_id: Not a number");
    return res.status(400).send({ msg: "400 - Bad Request: Invalid deck ID" });
  }

  try {
    // Fetch the deck details
    const deckQuery = `
      SELECT d.deck_id, d.name, d.profile_id
      FROM decks d
      WHERE d.deck_id = $1
    `;
    const deckResult = await db.query(deckQuery, [deck_id]);
    if (deckResult.rows.length === 0) {
      console.warn(`Deck with ID ${deck_id} not found`);
      return res.status(404).send({ msg: `Deck with ID ${deck_id} not found` });
    }

    // Fetch characters and their abilities associated with the deck
    const charactersQuery = `
      SELECT 
        c.character_id, 
        c.name AS character_name, 
        c.health, 
        c.damage, 
        c.point_cost, 
        c.shop_cost, 
        c.image_url AS character_image_url,
        a.ability_id,
        a.name AS ability_name, 
        a.description AS ability_description, 
        a.type AS ability_type, 
        a.strength AS ability_strength, 
        a.ability_cost
      FROM characters c
      JOIN decks_x_characters dxc ON c.character_id = dxc.character_id
      LEFT JOIN abilities a ON c.ability_id = a.ability_id
      WHERE dxc.deck_id = $1
    `;
    const charactersResult = await db.query(charactersQuery, [deck_id]);
    if (charactersResult.rows.length === 0) {
      console.warn(`No characters found for deck ID ${deck_id}`);
      return res
        .status(404)
        .send({ msg: `No characters found for deck ID ${deck_id}` });
    }

    const deck = deckResult.rows[0];
    const characters = charactersResult.rows.map((char) => ({
      character_id: char.character_id,
      name: char.character_name,
      health: char.health,
      damage: char.damage,
      point_cost: char.point_cost,
      shop_cost: char.shop_cost,
      image_url: char.character_image_url,
      ability: {
        ability_id: char.ability_id,
        name: char.ability_name,
        description: char.ability_description,
        type: char.ability_type,
        strength: char.ability_strength,
        ability_cost: char.ability_cost,
      },
    }));

    res.status(200).send({ ...deck, characters });
  } catch (err) {
    console.error("Error in getDeckWithAbilitiesById:", err);
    next(err);
  }
};
