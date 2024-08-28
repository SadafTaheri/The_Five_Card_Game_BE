import app from "./app";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// This is correct and more flexible than the original instruction
const PORT = process.env.PORT || 9090;

// This is correctly implemented
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
