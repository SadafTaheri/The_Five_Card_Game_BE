import { Request, Response } from "express";
import {
  fetchAllProfiles,
  insertProfile,
  modifyProfile,
} from "../Models/profilesModels";

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await fetchAllProfiles();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { account_id, username, currency } = req.body;

    if (
      !Number.isInteger(account_id) ||
      typeof username !== "string" ||
      !Number.isInteger(currency)
    ) {
      return res.status(400).json({ msg: "400 - Bad Request" });
    }

    const newProfile = await insertProfile(account_id, username, currency);
    res.status(201).json({ profile: newProfile });
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { username, currency } = req.body;

    if (!Number.isInteger(Number(profile_id))) {
      return res.status(400).json({ msg: "400 - Bad Request" });
    }
    const updatedProfile = await modifyProfile(
      Number(profile_id),
      username,
      currency
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: updatedProfile });
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
