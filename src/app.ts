import express, { Request, Response, NextFunction } from "express";
import { getAllData } from "./Controllers/controllers";

const app = express();
const port = 3000;

app.get("/api", getAllData);

// app.get("/api/users", getAllAbilities);

export default app;
