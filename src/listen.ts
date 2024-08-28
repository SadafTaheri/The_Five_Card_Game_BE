import * as dotenv from "dotenv";
import { join } from "path";

// Determine the correct .env file based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "test" ? ".env.test" : ".env.development";

dotenv.config({ path: join(__dirname, "..", envFile) });

import app from "./app";

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
