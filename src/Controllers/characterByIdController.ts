import { Request, Response, NextFunction } from "express";
import { fetchCharacterById } from "../Models/characterByIdModel";

export const getCharacterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { character_id } = req.params;

  try {
    const characterData = await fetchCharacterById(Number(character_id));

    if (!characterData) {
      return res.status(404).send({ message: "Character not found" });
    }

    const charObject = {
      name: characterData.character_name,
      health: characterData.health,
      damage: characterData.damage,
      ability: {
        name: characterData.ability_name,
        description: characterData.ability_description,
        type: characterData.ability_type,
        strength: characterData.ability_strength,
        ability_cost: characterData.ability_cost,
      },
      point_cost: characterData.point_cost,
      imageURL: characterData.image_url,
    };

    res.status(200).json({ character: charObject });
  } catch (err) {
    next(err);
  }
};
