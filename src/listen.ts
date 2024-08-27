import app from "./app";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the port from environment variables or default to 9090
const { PORT = 9090 } = process.env;

// Start the server
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
