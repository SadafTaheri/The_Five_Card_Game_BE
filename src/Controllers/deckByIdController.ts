import { Request, Response, NextFunction } from "express";
import db from "../../db/connection";

export const getDeckById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { deck_id } = req.params;

  if (isNaN(Number(deck_id))) {
    return res.status(400).send({ msg: "400 - Bad Request: Invalid deck ID" });
  }

  try {
    const deckQuery = `
      SELECT d.deck_id, d.name, d.profile_id
      FROM decks d
      WHERE d.deck_id = $1
    `;

    const charactersQuery = `
      SELECT c.character_id, c.name, c.health, c.damage, c.point_cost, c.shop_cost, c.image_url
      FROM characters c
      JOIN decks_x_characters dxc ON c.character_id = dxc.character_id
      WHERE dxc.deck_id = $1
    `;

    const deckResult = await db.query(deckQuery, [deck_id]);
    const charactersResult = await db.query(charactersQuery, [deck_id]);

    if (deckResult.rows.length === 0) {
      return res.status(404).send({ msg: `Deck with ID ${deck_id} not found` });
    }

    const deck = deckResult.rows[0];
    const characters = charactersResult.rows;

    res.status(200).send({ ...deck, characters });
  } catch (err) {
    next(err);
  }
};
