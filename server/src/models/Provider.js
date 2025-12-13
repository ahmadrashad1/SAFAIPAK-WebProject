import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    specialization: {
      type: [String],
      enum: [
        "Pest Control",
        "Sanitation & Cleaning",
        "Specialized Health",
        "Agriculture",
        "Mosquito & Dengue Control",
        "Termite Control",
        "Rodent Control",
        "Water Tank Cleaning",
        "Disinfection",
        "Crop-Specific Pest Control",
      ],
      default: [],
    },
    certificationLevel: {
      type: String,
      enum: ["basic", "intermediate", "advanced", "expert"],
      default: "basic",
    },
    yearsOfExperience: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalJobs: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    emergencyService: { type: Boolean, default: false },
    agriculturalSpecialization: {
      crops: [String],
      farmSizes: [String],
      equipment: [String],
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Provider = mongoose.model("Provider", providerSchema);

export default Provider;

