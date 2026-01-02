import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const ReviewForm = ({ booking, provider, onSuccess, onCancel }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!booking || !booking.providerId) {
      setError("Provider information is missing.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await api.post("/api/reviews", {
        bookingId: booking._id,
        providerId: booking.providerId,
        rating,
        comment,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Write a Review</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {booking && (
                <div className="mb-3">
                  <p className="mb-1">
                    <strong>Service:</strong> {booking.serviceType || "N/A"}
                  </p>
                  {provider && (
                    <p className="mb-0">
                      <strong>Provider:</strong> {provider.name}
                    </p>
                  )}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">
                  Rating <span className="text-danger">*</span>
                </label>
                <div className="d-flex align-items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="btn btn-link p-0"
                      style={{
                        fontSize: "2rem",
                        color: star <= rating ? "#ffc107" : "#ddd",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      onClick={() => setRating(star)}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="ms-2 text-muted">
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Your Review</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tell us about your experience with the service..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <div className="alert alert-info mb-0">
                <small>
                  <strong>Tip:</strong> Your review helps other customers and service providers improve.
                  Please be honest and constructive.
                </small>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;

