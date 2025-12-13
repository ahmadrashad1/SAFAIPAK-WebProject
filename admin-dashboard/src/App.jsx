import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

function App() {
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, providersRes, statsRes] = await Promise.all([
        api.get("/api/bookings"),
        api.get("/api/providers"),
        api.get("/api/analytics/dashboard"),
      ]);
      setBookings(bookingsRes.data);
      setProviders(providersRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingId, providerId = null) => {
    try {
      if (!bookingId) {
        alert("❌ Booking ID is missing");
        return;
      }

      const payload = providerId && providerId.trim() !== "" 
        ? { providerId: providerId.trim() }
        : {};

      await api.patch(`/api/bookings/${bookingId}/confirm`, payload);
      await loadData();
      setShowConfirmModal(false);
      setSelectedBooking(null);
      alert("✅ Booking confirmed successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Unknown error";
      console.error("Confirm booking error:", error.response?.data || error);
      alert(`❌ Failed to confirm booking: ${errorMsg}`);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/api/bookings/${bookingId}`, { status: newStatus });
      await loadData();
      alert(`✅ Booking status updated to ${newStatus}`);
    } catch (error) {
      alert("❌ Failed to update status: " + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-warning text-dark",
      confirmed: "bg-info text-white",
      "in-progress": "bg-primary text-white",
      completed: "bg-success text-white",
      cancelled: "bg-danger text-white",
    };
    return badges[status] || "bg-secondary text-white";
  };

  const getUrgencyBadge = (urgency) => {
    return urgency === "emergency" ? (
      <span className="badge bg-danger">🚨 Emergency</span>
    ) : (
      <span className="badge bg-secondary">Normal</span>
    );
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 fw-bold mb-1">SafaiPak Admin Dashboard</h1>
              <p className="text-muted mb-0">Manage bookings and providers</p>
            </div>
            <button
              className="btn btn-outline-primary"
              onClick={loadData}
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-muted mb-2">Total Bookings</h6>
                <h3 className="mb-0">{stats.totalBookings}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-muted mb-2">Pending</h6>
                <h3 className="mb-0 text-warning">{stats.pendingBookings}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-muted mb-2">Completed</h6>
                <h3 className="mb-0 text-success">{stats.completedBookings}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-muted mb-2">Providers</h6>
                <h3 className="mb-0">{stats.totalProviders}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">All Bookings</h5>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={loadData}
            >
              🔄 Refresh
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th>Service</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <small className="text-muted">
                          {booking._id?.substring(0, 8)}...
                        </small>
                      </td>
                      <td>
                        <strong>{booking.name}</strong>
                        {booking.email && (
                          <div>
                            <small className="text-muted">{booking.email}</small>
                          </div>
                        )}
                      </td>
                      <td>
                        <small>{booking.phone}</small>
                      </td>
                      <td>{booking.city}</td>
                      <td>
                        <small>
                          {booking.serviceType || booking.message?.substring(0, 30) || "N/A"}
                        </small>
                      </td>
                      <td>{getUrgencyBadge(booking.urgency)}</td>
                      <td>
                        <span
                          className={`badge ${getStatusBadge(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <small>
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          {booking.status === "pending" && (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowConfirmModal(true);
                              }}
                              title="Confirm Booking"
                            >
                              ✓ Confirm
                            </button>
                          )}
                          <div className="btn-group btn-group-sm">
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              Status
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleUpdateStatus(booking._id, "confirmed")
                                  }
                                >
                                  Mark as Confirmed
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleUpdateStatus(booking._id, "in-progress")
                                  }
                                >
                                  Mark as In-Progress
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleUpdateStatus(booking._id, "completed")
                                  }
                                >
                                  Mark as Completed
                                </button>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() =>
                                    handleUpdateStatus(booking._id, "cancelled")
                                  }
                                >
                                  Cancel Booking
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && selectedBooking && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Booking</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowConfirmModal(false);
                    setSelectedBooking(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Customer:</strong> {selectedBooking.name}
                </p>
                <p>
                  <strong>Service:</strong> {selectedBooking.serviceType || selectedBooking.message}
                </p>
                <p>
                  <strong>City:</strong> {selectedBooking.city}
                </p>
                <p>
                  <strong>Urgency:</strong> {selectedBooking.urgency}
                </p>

                <div className="mb-3">
                  <label className="form-label">
                    Assign Provider (Optional)
                  </label>
                  <select
                    className="form-select"
                    id="providerSelect"
                    defaultValue=""
                  >
                    <option value="">No provider assignment</option>
                    {providers
                      .filter(
                        (p) =>
                          p.city === selectedBooking.city && p.available
                      )
                      .map((provider) => (
                        <option key={provider._id} value={provider._id}>
                          {provider.name} - {provider.specialization?.[0] || "General"}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowConfirmModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    const providerSelect =
                      document.getElementById("providerSelect");
                    const providerId = providerSelect?.value || null;
                    handleConfirmBooking(selectedBooking._id, providerId);
                  }}
                >
                  ✓ Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
