import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true, trim: true },
    urgency: {
      type: String,
      enum: ["normal", "emergency"],
      default: "normal",
    },
    scheduledFor: { type: Date },
    details: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
    amount: { type: Number, default: 0 },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

