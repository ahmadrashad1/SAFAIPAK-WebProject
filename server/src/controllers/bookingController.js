import Booking from "../models/Booking.js";
import { useMemoryStore } from "../config/db.js";
import memoryBookings from "../store/memoryBookings.js";

export const createBooking = async (req, res) => {
  try {
    if (useMemoryStore) {
      const booking = memoryBookings.addBooking(req.body);
      return res.status(201).json(booking);
    }

    const booking = await Booking.create(req.body);
    return res.status(201).json(booking);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Could not create booking", error: error.message });
  }
};

export const listBookings = async (_req, res) => {
  try {
    if (useMemoryStore) {
      return res.json(memoryBookings.listBookings());
    }

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (useMemoryStore) {
      const booking = memoryBookings.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.json(booking);
    }

    const booking = await Booking.findById(id).lean();
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch booking", error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate status if provided
    if (updates.status) {
      const validStatuses = ["pending", "confirmed", "in-progress", "completed", "cancelled"];
      if (!validStatuses.includes(updates.status)) {
        return res.status(400).json({
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        });
      }
    }

    if (useMemoryStore) {
      const booking = memoryBookings.updateBooking(id, updates);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.json(booking);
    }

    const booking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json(booking);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update booking", error: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { providerId } = req.body || {};

    if (!id) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    const updates = {
      status: "confirmed",
      ...(providerId && providerId.trim() !== "" && { providerId }),
    };

    if (useMemoryStore) {
      const booking = memoryBookings.updateBooking(id, updates);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.json(booking);
    }

    const booking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json(booking);
  } catch (error) {
    console.error("Confirm booking error:", error);
    res
      .status(400)
      .json({ 
        message: "Failed to confirm booking", 
        error: error.message,
        details: error.stack 
      });
  }
};

