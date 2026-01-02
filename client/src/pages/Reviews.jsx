import { useState, useEffect } from "react";
import axios from "axios";
import AnimatedSection from "../components/AnimatedSection";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [serviceType, setServiceType] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rating) {
      alert("Please provide your name and rating");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/api/reviews", {
        customerName: name,
        customerEmail: email || undefined,
        rating: parseInt(rating),
        comment: comment || undefined,
        serviceType: serviceType || "General Service",
      });

      alert("✅ Thank you for your review!");
      
      // Reset form
      setName("");
      setEmail("");
      setRating(5);
      setComment("");
      setServiceType("");
      
      // Reload reviews
      loadReviews();
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("❌ Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="section-padding">
      <div className="container">
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3">Customer Reviews</h1>
            <p className="text-secondary">
              Share your experience with SafaiPak services
            </p>
            {reviews.length > 0 && (
              <div className="mt-3">
                <h2 className="display-4 fw-bold text-primary">{avgRating}</h2>
                <div className="fs-3">{getRatingStars(Math.round(avgRating))}</div>
                <p className="text-muted">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        <div className="row g-4">
          {/* Review Form */}
          <div className="col-lg-5">
            <AnimatedSection animation="fadeInLeft">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="h5 mb-4">Leave a Review</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">
                        Your Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email (Optional)</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Service Type</label>
                      <select
                        className="form-select"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                      >
                        <option value="">Select a service</option>
                        <option value="Pest Control">Pest Control</option>
                        <option value="Water Tank Cleaning">Water Tank Cleaning</option>
                        <option value="Sanitation">Sanitation</option>
                        <option value="Agricultural Services">Agricultural Services</option>
                        <option value="General Service">General Service</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Rating <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex align-items-center gap-2 mb-2">
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
                      </div>
                      <small className="text-muted">
                        {rating} out of 5 stars
                      </small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Your Review</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Tell us about your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Reviews List */}
          <div className="col-lg-7">
            <AnimatedSection animation="fadeInRight">
              <h3 className="h5 mb-4">Recent Reviews ({reviews.length})</h3>
              
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No reviews yet. Be the first to leave a review!</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {reviews.slice(0, 10).map((review, index) => (
                    <div key={review._id || index} className="card border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-0">{review.customerName || "Anonymous"}</h6>
                            <small className="text-muted">
                              {review.serviceType || "General Service"}
                            </small>
                          </div>
                          <div className="text-warning">
                            {getRatingStars(review.rating)}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="mb-2 text-secondary">{review.comment}</p>
                        )}
                        <small className="text-muted">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

