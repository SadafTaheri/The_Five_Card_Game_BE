import { Request, Response } from "express";
import { fetchAllCharacters } from "../Models/charactersModel";

export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await fetchAllCharacters();
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
