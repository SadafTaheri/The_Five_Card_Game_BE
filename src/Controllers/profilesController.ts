import { Request, Response } from "express";
import { fetchAllProfiles } from "../Models/profilesModels";

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await fetchAllProfiles();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
