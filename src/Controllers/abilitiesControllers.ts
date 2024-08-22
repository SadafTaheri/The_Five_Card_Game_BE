import { Request, Response } from "express";
import { fetchAllAbilities } from "../Models/abilitiesModels";

export const getAllAbilities = async (
  req: Request,
  res: Response,
  err: Error
) => {
  try {
    const abilities = await fetchAllAbilities();
    res.status(200).json(abilities);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
