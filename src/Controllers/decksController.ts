import { Request, Response } from "express";
import { fetchAllDecks } from "../Models/decksModel";

export const getAllDecks = async (req: Request, res: Response) => {
  try {
    const decks = await fetchAllDecks();
    res.status(200).json(decks);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
