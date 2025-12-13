import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "SafaiPak API",
    version: "1.0.0",
    endpoints: {
      bookings: "/api/bookings",
      services: "/api/services",
      providers: "/api/providers",
      analytics: "/api/analytics",
    },
  });
});

app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/analytics", analyticsRoutes);

export default app;

