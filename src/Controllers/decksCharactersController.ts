import { Request, Response } from "express";
import { fetchAllDecksCharacters } from "../Models/decksCharactersModel";

export const getAllDecksCharacters = async (req: Request, res: Response) => {
  try {
    const decksCharacters = await fetchAllDecksCharacters();
    res.status(200).json(decksCharacters);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
