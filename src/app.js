"use strict";
// import express from "express";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response } from "express";
// import { getAllAccounts } from "./Controllers/accountsController";
// import { getAllDecks } from "./Controllers/decksController";
// import { getAllCharacters } from "./Controllers/charactersController";
// import { getAllDecksCharacters } from "./Controllers/decksCharactersController";
// import {
//   createProfile,
//   getAllProfiles,
//   updateProfile,
// } from "./Controllers/profilesController";
// import { getAllProfilesCharacters } from "./Controllers/profilesCharactersController";
// import { getCharacterById } from "./Controllers/characterByIdController";
// import endpoints from "./endpoints";
// import * as dotenv from "dotenv";
// import { getAllAbilities } from "./Controllers/abilitiesControllers";
// import { getDeckById } from "./Controllers/deckByIdController";
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.get("/api", (req: Request, res: Response, next: any) => {
//   try {
//     res.status(200).json({ endpoints });
//   } catch (error) {
//     next(error);
//   }
// });
// app.get("/api/abilities", getAllAbilities);
// app.get("/api/accounts", getAllAccounts);
// app.get("/api/decks", getAllDecks);
// app.get("/api/decks/:deck_id", getDeckById);
// app.get("/api/characters", getAllCharacters);
// app.get("/api/decks-characters", getAllDecksCharacters);
// app.get("/api/profiles", getAllProfiles);
// app.get("/api/profiles-characters", getAllProfilesCharacters);
// app.get("/api/characters/:character_id", getCharacterById);
// app.post("/api/profiles", createProfile);
// app.patch("/api/profiles/:profile_id", updateProfile);
// app.use((err: any, req: Request, res: Response, next: any) => {
//   if (err.code === "22P02" || err.code === "23502") {
//     res.status(400).send({ msg: "400 - Bad Request" });
//   } else {
//     next(err);
//   }
// });
// app.use((err: any, req: Request, res: Response, next: any) => {
//   if (err.status && err.msg) {
//     res.status(err.status).send({ msg: err.msg });
//   } else {
//     next(err);
//   }
// });
// export default app;
var express = require("express");
var accountsController_1 = require("./Controllers/accountsController");
var decksController_1 = require("./Controllers/decksController");
var charactersController_1 = require("./Controllers/charactersController");
var decksCharactersController_1 = require("./Controllers/decksCharactersController");
var profilesController_1 = require("./Controllers/profilesController");
var profilesCharactersController_1 = require("./Controllers/profilesCharactersController");
var characterByIdController_1 = require("./Controllers/characterByIdController");
var endpoints_1 = require("./endpoints");
var dotenv = require("dotenv");
var abilitiesControllers_1 = require("./Controllers/abilitiesControllers");
var deckByIdController_1 = require("./Controllers/deckByIdController");
dotenv.config();
var app = express();
app.use(express.json());
app.get("/api", function (req, res, next) {
    try {
        res.status(200).json({ endpoints: endpoints_1.default });
    }
    catch (error) {
        next(error);
    }
});
app.get("/api/abilities", abilitiesControllers_1.getAllAbilities);
app.get("/api/accounts", accountsController_1.getAllAccounts);
app.get("/api/decks", decksController_1.getAllDecks);
app.get("/api/decks/:deck_id", deckByIdController_1.getDeckById);
app.get("/api/characters", charactersController_1.getAllCharacters);
app.get("/api/decks-characters", decksCharactersController_1.getAllDecksCharacters);
app.get("/api/profiles", profilesController_1.getAllProfiles);
app.get("/api/profiles-characters", profilesCharactersController_1.getAllProfilesCharacters);
app.get("/api/characters/:character_id", characterByIdController_1.getCharacterById);
app.post("/api/profiles", profilesController_1.createProfile);
app.patch("/api/profiles/:profile_id", profilesController_1.updateProfile);
app.use(function (err, req, res, next) {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({ msg: "400 - Bad Request" });
    }
    else {
        next(err);
    }
});
app.use(function (err, req, res, next) {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else {
        next(err);
    }
});
exports.default = app;
