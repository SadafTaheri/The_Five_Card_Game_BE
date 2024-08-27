import { Request, Response } from "express";
import { fetchAllAccounts } from "../Models/accountsModel";

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await fetchAllAccounts();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: `Error: ${(err as Error).message}` });
  }
};
