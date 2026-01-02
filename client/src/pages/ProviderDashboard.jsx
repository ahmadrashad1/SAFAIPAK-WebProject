import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const ProviderDashboard = () => {
  const [providerId, setProviderId] = useState(localStorage.getItem("providerId") || "");
  const [provider, setProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (providerId) {
      loadProviderData();
    }
  }, [providerId]);

  const loadProviderData = async () => {
    setLoading(true);
    setError("");
    try {
      const [providerRes, analyticsRes, bookingsRes] = await Promise.all([
        api.get(`/api/providers/${providerId}`),
        api.get(`/api/analytics/provider/${providerId}`),
        api.get("/api/bookings"),
      ]);

      setProvider(providerRes.data);
      setAnalytics(analyticsRes.data);
      
      // Filter bookings for this provider
      const myBookings = bookingsRes.data.filter(
        (b) => b.providerId === providerId
      );
      setBookings(myBookings);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load provider data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("providerId", providerId);
    loadProviderData();
  };

  const handleLogout = () => {
    setProviderId("");
    setProvider(null);
    setBookings([]);
    setAnalytics(null);
    localStorage.removeItem("providerId");
  };

  if (!provider) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Provider Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Provider ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={providerId}
                      onChange={(e) => setProviderId(e.target.value)}
                      placeholder="Enter your Provider ID"
                      required
                    />
                    <small className="text-muted">
                      Find your Provider ID in the admin dashboard or contact support
                    </small>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Loading..." : "Access Dashboard"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="provider-dashboard">
      {/* Header */}
      <div className="bg-primary text-white py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Welcome, {provider.name}</h2>
              <p className="mb-0 opacity-75">
                {provider.city} • {provider.certificationLevel} Certified
              </p>
            </div>
            <button className="btn btn-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-light border-bottom">
        <div className="container">
          <ul className="nav nav-tabs border-0 pt-3">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
                onClick={() => setActiveTab("bookings")}
              >
                My Bookings ({bookings.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "analytics" ? "active" : ""}`}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container py-4">
        {/* Overview Tab */}
        {activeTab === "overview" && analytics && (
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3 className="text-primary">{analytics.bookings.total}</h3>
                  <p className="text-muted mb-0">Total Jobs</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3 className="text-success">{analytics.bookings.completed}</h3>
                  <p className="text-muted mb-0">Completed</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3 className="text-warning">{analytics.bookings.pending}</h3>
                  <p className="text-muted mb-0">Pending</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3 className="text-info">PKR {analytics.earnings.total.toLocaleString()}</h3>
                  <p className="text-muted mb-0">Total Earnings</p>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Recent Bookings</h5>
                </div>
                <div className="card-body">
                  {bookings.length === 0 ? (
                    <p className="text-muted text-center">No bookings yet</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.slice(0, 5).map((booking) => (
                            <tr key={booking._id}>
                              <td>{booking.name}</td>
                              <td>{booking.serviceType}</td>
                              <td>{booking.city}</td>
                              <td>
                                <span className={`badge bg-${
                                  booking.status === "completed" ? "success" :
                                  booking.status === "confirmed" ? "primary" :
                                  booking.status === "in-progress" ? "info" : "warning"
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td>PKR {booking.amount?.toLocaleString() || "N/A"}</td>
                              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">All Bookings</h5>
            </div>
            <div className="card-body">
              {bookings.length === 0 ? (
                <p className="text-muted text-center">No bookings assigned yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Service</th>
                        <th>City</th>
                        <th>Urgency</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Scheduled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>
                            <strong>{booking.name}</strong>
                            <br />
                            <small className="text-muted">{booking.email}</small>
                          </td>
                          <td>{booking.phone}</td>
                          <td>{booking.serviceType}</td>
                          <td>{booking.city}</td>
                          <td>
                            <span className={`badge bg-${booking.urgency === "emergency" ? "danger" : "secondary"}`}>
                              {booking.urgency}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${
                              booking.status === "completed" ? "success" :
                              booking.status === "confirmed" ? "primary" :
                              booking.status === "in-progress" ? "info" : "warning"
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td>PKR {booking.amount?.toLocaleString() || "N/A"}</td>
                          <td>
                            {booking.scheduledFor 
                              ? new Date(booking.scheduledFor).toLocaleString()
                              : "Not scheduled"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Provider Information</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="text-muted">Name</label>
                    <p className="mb-0">{provider.name}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted">Email</label>
                    <p className="mb-0">{provider.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted">Phone</label>
                    <p className="mb-0">{provider.phone}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted">City</label>
                    <p className="mb-0">{provider.city}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted">Certification Level</label>
                    <p className="mb-0">
                      <span className="badge bg-primary">{provider.certificationLevel}</span>
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted">Rating</label>
                    <p className="mb-0">⭐ {provider.rating?.toFixed(1) || "No ratings yet"}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted">Status</label>
                    <p className="mb-0">
                      <span className={`badge bg-${provider.available ? "success" : "secondary"}`}>
                        {provider.available ? "Available" : "Unavailable"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Specializations</h5>
                </div>
                <div className="card-body">
                  {provider.specialization && provider.specialization.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {provider.specialization.map((spec, idx) => (
                        <span key={idx} className="badge bg-info text-dark">
                          {spec}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No specializations listed</p>
                  )}

                  {provider.agriculturalSpecialization?.crops && (
                    <div className="mt-4">
                      <h6>Agricultural Expertise</h6>
                      <p className="mb-1">
                        <strong>Crops:</strong> {provider.agriculturalSpecialization.crops.join(", ")}
                      </p>
                      <p className="mb-1">
                        <strong>Farm Sizes:</strong> {provider.agriculturalSpecialization.farmSizes?.join(", ") || "N/A"}
                      </p>
                      <p className="mb-0">
                        <strong>Equipment:</strong> {provider.agriculturalSpecialization.equipment?.join(", ") || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && analytics && (
          <div className="row g-4">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Performance Overview</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h6>Booking Statistics</h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <span className="text-muted">Total Jobs:</span>
                          <strong className="float-end">{analytics.bookings.total}</strong>
                        </li>
                        <li className="mb-2">
                          <span className="text-muted">Completed:</span>
                          <strong className="float-end text-success">{analytics.bookings.completed}</strong>
                        </li>
                        <li className="mb-2">
                          <span className="text-muted">Pending:</span>
                          <strong className="float-end text-warning">{analytics.bookings.pending}</strong>
                        </li>
                        <li>
                          <span className="text-muted">Success Rate:</span>
                          <strong className="float-end">
                            {analytics.bookings.total > 0
                              ? ((analytics.bookings.completed / analytics.bookings.total) * 100).toFixed(1)
                              : 0}%
                          </strong>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h6>Earnings Summary</h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <span className="text-muted">Total Earnings:</span>
                          <strong className="float-end">PKR {analytics.earnings.total.toLocaleString()}</strong>
                        </li>
                        <li className="mb-2">
                          <span className="text-muted">Average per Job:</span>
                          <strong className="float-end">
                            PKR {analytics.bookings.completed > 0
                              ? (analytics.earnings.total / analytics.bookings.completed).toFixed(0)
                              : 0}
                          </strong>
                        </li>
                        <li>
                          <span className="text-muted">Rating:</span>
                          <strong className="float-end">⭐ {provider.rating?.toFixed(1) || "N/A"}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="alert alert-info mt-3">
                    <strong>💡 Tip:</strong> Maintain high service quality and quick response times to improve your rating and get more bookings!
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Quick Stats</h5>
                </div>
                <div className="card-body">
                  <div className="text-center mb-3">
                    <h2 className="text-primary mb-0">{provider.totalJobs || 0}</h2>
                    <small className="text-muted">Lifetime Jobs</small>
                  </div>
                  <div className="text-center mb-3">
                    <h2 className="text-success mb-0">{provider.yearsOfExperience || 0}</h2>
                    <small className="text-muted">Years Experience</small>
                  </div>
                  <div className="text-center">
                    <h2 className="text-info mb-0">
                      {provider.verified ? "✓" : "✗"}
                    </h2>
                    <small className="text-muted">Verified Provider</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
