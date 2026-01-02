import { useState, useEffect } from "react";
import axios from "axios";
import AnimatedSection from "../components/AnimatedSection";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    photos: [],
  });

  const fetchBookings = async () => {
    if (!email && !phone) {
      alert("Please enter your email or phone number");
      return;
    }

    setLoading(true);
    try {
      const allBookings = await api.get("/api/bookings");
      let filtered = allBookings.data;

      if (email) {
        filtered = filtered.filter((b) => b.email?.toLowerCase() === email.toLowerCase());
      }
      if (phone) {
        filtered = filtered.filter((b) => b.phone === phone);
      }

      setBookings(filtered);

      // Fetch existing reviews
      const reviewsRes = await api.get("/api/reviews");
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      alert("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedBooking || !selectedBooking.providerId) {
      alert("Provider information is missing. Cannot submit review.");
      return;
    }

    try {
      await api.post("/api/reviews", {
        bookingId: selectedBooking._id,
        providerId: selectedBooking.providerId,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        photos: reviewForm.photos,
      });

      alert("✅ Thank you! Your review has been submitted successfully.");
      setShowReviewModal(false);
      setSelectedBooking(null);
      setReviewForm({ rating: 5, comment: "", photos: [] });
      fetchBookings(); // Refresh to get updated data
    } catch (error) {
      console.error("Review submission error:", error);
      alert("Failed to submit review: " + (error.response?.data?.message || error.message));
    }
  };

  const openReviewModal = (booking) => {
    if (booking.status !== "completed") {
      alert("You can only review completed bookings.");
      return;
    }

    if (!booking.providerId) {
      alert("Provider information is missing for this booking.");
      return;
    }

    // Check if review already exists
    const existingReview = reviews.find((r) => r.bookingId === booking._id);
    if (existingReview) {
      alert("You have already submitted a review for this booking.");
      return;
    }

    setSelectedBooking(booking);
    setReviewForm({ rating: 5, comment: "", photos: [] });
    setShowReviewModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: "bg-warning text-dark", text: "⏳ Pending" },
      confirmed: { class: "bg-info text-white", text: "✓ Confirmed" },
      "in-progress": { class: "bg-primary text-white", text: "🔄 In Progress" },
      completed: { class: "bg-success text-white", text: "✅ Completed" },
      cancelled: { class: "bg-danger text-white", text: "❌ Cancelled" },
    };
    return badges[status] || { class: "bg-secondary", text: status };
  };

  const hasReview = (bookingId) => {
    return reviews.some((r) => r.bookingId === bookingId);
  };

  return (
    <AnimatedSection animation="fadeUp" threshold={0.15}>
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3">My Bookings</h1>
                <p className="text-muted">
                  Enter your email or phone number to view your bookings and leave reviews
                </p>
              </div>

              {/* Search Form */}
              <div className="card shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-md-5">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="0300-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      <button
                        className="btn btn-primary w-100"
                        onClick={fetchBookings}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Search"}
                      </button>
                    </div>
                  </div>
                  <small className="text-muted">
                    Enter at least one of the above fields to search for your bookings
                  </small>
                </div>
              </div>

              {/* Bookings List */}
              {bookings.length > 0 && (
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">Your Bookings ({bookings.length})</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Service</th>
                            <th>City</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking._id}>
                              <td>
                                <strong>{booking.serviceType || "N/A"}</strong>
                                {booking.urgency === "emergency" && (
                                  <span className="badge bg-danger ms-2">🚨 Emergency</span>
                                )}
                              </td>
                              <td>{booking.city}</td>
                              <td>
                                <small>
                                  {new Date(booking.createdAt).toLocaleDateString()}
                                </small>
                              </td>
                              <td>
                                <span className={`badge ${getStatusBadge(booking.status).class}`}>
                                  {getStatusBadge(booking.status).text}
                                </span>
                              </td>
                              <td>
                                {booking.amount ? (
                                  <strong>PKR {booking.amount.toLocaleString()}</strong>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td>
                                {booking.status === "completed" && booking.providerId && (
                                  <>
                                    {hasReview(booking._id) ? (
                                      <span className="badge bg-success">
                                        ✓ Reviewed
                                      </span>
                                    ) : (
                                      <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => openReviewModal(booking)}
                                      >
                                        ⭐ Leave Review
                                      </button>
                                    )}
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {bookings.length === 0 && !loading && (
                <div className="text-center py-5">
                  <p className="text-muted">
                    {email || phone
                      ? "No bookings found. Please check your email or phone number."
                      : "Enter your email or phone number above to view your bookings."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && selectedBooking && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Write a Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedBooking(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <p className="mb-1">
                    <strong>Service:</strong> {selectedBooking.serviceType || "N/A"}
                  </p>
                  <p className="mb-0">
                    <strong>Date:</strong>{" "}
                    {new Date(selectedBooking.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Rating <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="btn btn-link p-0"
                        style={{
                          fontSize: "2rem",
                          color: rating <= reviewForm.rating ? "#ffc107" : "#ddd",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => setReviewForm({ ...reviewForm, rating })}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="ms-2">
                      {reviewForm.rating} out of 5 stars
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Your Review</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Tell us about your experience..."
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                  />
                </div>

                <div className="alert alert-info mb-0">
                  <small>
                    <strong>Note:</strong> Your review will help other customers make informed
                    decisions. Please be honest and constructive.
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default MyBookings;

