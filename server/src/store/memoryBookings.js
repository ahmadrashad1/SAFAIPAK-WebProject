const bookings = [];

export const addBooking = (payload) => {
  const doc = {
    _id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    ...payload,
    status: payload.status || "pending",
    amount: payload.amount || 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  bookings.unshift(doc);
  return doc;
};

export const listBookings = (limit = 50) => bookings.slice(0, limit);

export const getBooking = (id) => {
  return bookings.find((b) => b._id === id);
};

export const updateBooking = (id, updates) => {
  const index = bookings.findIndex((b) => b._id === id);
  if (index === -1) return null;

  bookings[index] = {
    ...bookings[index],
    ...updates,
    updatedAt: new Date(),
  };
  return bookings[index];
};

export default {
  addBooking,
  listBookings,
  getBooking,
  updateBooking,
};

