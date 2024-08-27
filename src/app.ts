import express, { Request, Response } from "express";

import { getAllAccounts } from "./Controllers/accountsController";
import { getAllDecks } from "./Controllers/decksController";
import { getAllCharacters } from "./Controllers/charactersController";
import { getAllDecksCharacters } from "./Controllers/decksCharactersController";
import {
  createProfile,
  getAllProfiles,
  updateProfile,
} from "./Controllers/profilesController";
import { getAllProfilesCharacters } from "./Controllers/profilesCharactersController";
import { getCharacterById } from "./Controllers/characterByIdController";
import endpoints from "./endpoints";
import dotenv from "dotenv";
import { getAllAbilities } from "./Controllers/abilitiesControllers";
import { getDeckById } from "./Controllers/deckByIdController";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/api", (req: Request, res: Response, next: any) => {
  try {
    res.status(200).json({ endpoints });
  } catch (error) {
    next(error);
  }
});

app.get("/api/abilities", getAllAbilities);

app.get("/api/accounts", getAllAccounts);

app.get("/api/decks", getAllDecks);

app.get("/api/decks/:deck_id", getDeckById);

app.get("/api/characters", getAllCharacters);

app.get("/api/decks-characters", getAllDecksCharacters);

app.get("/api/profiles", getAllProfiles);

app.get("/api/profiles-characters", getAllProfilesCharacters);

app.get("/api/characters/:character_id", getCharacterById);

app.post("/api/profiles", createProfile);

app.patch("/api/profiles/:profile_id", updateProfile);

app.use((err: any, req: Request, res: Response, next: any) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "400 - Bad Request" });
  } else {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: any) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

export default app;
