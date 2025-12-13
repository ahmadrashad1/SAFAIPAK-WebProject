import { Router } from "express";
import {
  createBooking,
  listBookings,
  getBooking,
  updateBooking,
  confirmBooking,
} from "../controllers/bookingController.js";

const router = Router();

router.get("/", listBookings);
router.post("/", createBooking);
router.patch("/:id/confirm", confirmBooking); // Must be before /:id routes
router.get("/:id", getBooking);
router.put("/:id", updateBooking);

export default router;

