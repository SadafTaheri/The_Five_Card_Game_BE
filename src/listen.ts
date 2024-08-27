import app from "./app";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the port from environment variables or default to 9090
const PORT = process.env.PORT || 9090;

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
