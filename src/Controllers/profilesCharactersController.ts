import { Request, Response } from "express";
import { fetchAllProfilesCharacters } from "../Models/profilesCharactersModel";

export const getAllProfilesCharacters = async (req: Request, res: Response) => {
  try {
    const profilesCharacters = await fetchAllProfilesCharacters();
    res.status(200).json(profilesCharacters);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
