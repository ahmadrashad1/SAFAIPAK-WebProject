import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, default: Date.now },
    city: { type: String, required: true },
    serviceType: { type: String, required: true },
    demandLevel: { type: Number, min: 0, max: 10 },
    bookingsCount: { type: Number, default: 0 },
    averageResponseTime: { type: Number }, // in minutes
    providerDensity: { type: Number }, // providers per square km
    seasonalTrend: { type: String },
  },
  {
    timestamps: true,
  }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;

