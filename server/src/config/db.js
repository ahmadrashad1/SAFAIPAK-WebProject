import mongoose from "mongoose";

// Default to in-memory store unless explicitly disabled.
export const useMemoryStore = process.env.USE_MEMORY_DB !== "false";

const connectDB = async () => {
  if (useMemoryStore) {
    console.log("Using in-memory store (Mongo connection skipped)");
    return;
  }

  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/safaipak";

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Mongo connection error:", error.message);
    throw error;
  }
};

export default connectDB;

