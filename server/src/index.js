import dotenv from "dotenv";
import app from "./app.js";
import connectDB, { useMemoryStore } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `SafaiPak API running on port ${PORT}${
          useMemoryStore ? " (in-memory mode)" : ""
        }`
      );
    });
  })
  .catch((error) => {
    console.error("Server startup halted due to DB error:", error.message);
    process.exit(1);
  });

