import { useState, useEffect } from "react";
import axios from "axios";
import AnimatedSection from "../components/AnimatedSection.jsx";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const OutbreakAlerts = () => {
  const [outbreaks, setOutbreaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCity, setFilterCity] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  useEffect(() => {
    loadOutbreaks();
  }, []);

  const loadOutbreaks = async () => {
    try {
      const response = await api.get("/api/outbreaks");
      setOutbreaks(response.data);
    } catch (error) {
      console.error("Failed to load outbreaks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      low: "success",
      medium: "warning",
      high: "danger",
      critical: "dark",
    };
    return colors[severity] || "secondary";
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: "danger",
      monitoring: "warning",
      resolved: "success",
    };
    return colors[status] || "secondary";
  };

  const filteredOutbreaks = outbreaks.filter((outbreak) => {
    if (filterCity && !outbreak.city.toLowerCase().includes(filterCity.toLowerCase())) {
      return false;
    }
    if (filterSeverity && outbreak.severity !== filterSeverity) {
      return false;
    }
    return true;
  });

  const activeOutbreaks = filteredOutbreaks.filter((o) => o.status === "active");
  const monitoringOutbreaks = filteredOutbreaks.filter((o) => o.status === "monitoring");

  return (
    <div className="outbreak-alerts-page">
      {/* Hero Section */}
      <section className="bg-danger text-white py-5">
        <div className="container">
          <AnimatedSection animation="fadeIn">
            <h1 className="display-4 fw-bold mb-3">🚨 Outbreak Alert System</h1>
            <p className="lead mb-4">
              Real-time monitoring of pest and disease outbreaks across Pakistan.
              Stay informed and take preventive action.
            </p>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card bg-white text-dark">
                  <div className="card-body text-center">
                    <h2 className="text-danger mb-0">{activeOutbreaks.length}</h2>
                    <small>Active Outbreaks</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-white text-dark">
                  <div className="card-body text-center">
                    <h2 className="text-warning mb-0">{monitoringOutbreaks.length}</h2>
                    <small>Under Monitoring</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-white text-dark">
                  <div className="card-body text-center">
                    <h2 className="text-success mb-0">
                      {filteredOutbreaks.filter((o) => o.status === "resolved").length}
                    </h2>
                    <small>Resolved</small>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-light py-4">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by city..."
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
              >
                <option value="">All Severity Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Outbreak List */}
      <section className="py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredOutbreaks.length === 0 ? (
            <div className="text-center py-5">
              <h4>No outbreaks match your filters</h4>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredOutbreaks.map((outbreak, idx) => (
                <div key={outbreak._id} className="col-md-6 col-lg-4">
                  <AnimatedSection animation="scaleIn" delay={idx * 50}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="card-title mb-0">{outbreak.diseaseType}</h5>
                          <span className={`badge bg-${getStatusBadge(outbreak.status)}`}>
                            {outbreak.status}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <span className={`badge bg-${getSeverityBadge(outbreak.severity)} me-2`}>
                            {outbreak.severity} severity
                          </span>
                          <span className="text-muted">
                            📍 {outbreak.city}
                          </span>
                        </div>

                        <p className="card-text text-muted small mb-3">
                          {outbreak.description}
                        </p>

                        <div className="border-top pt-3">
                          <div className="d-flex justify-content-between text-small mb-2">
                            <span className="text-muted">Affected Area:</span>
                            <strong>{outbreak.affectedArea || "N/A"}</strong>
                          </div>
                          <div className="d-flex justify-content-between text-small mb-2">
                            <span className="text-muted">Cases Reported:</span>
                            <strong>{outbreak.casesReported || 0}</strong>
                          </div>
                          <div className="d-flex justify-content-between text-small">
                            <span className="text-muted">Reported:</span>
                            <strong>
                              {new Date(outbreak.reportedDate).toLocaleDateString()}
                            </strong>
                          </div>
                        </div>

                        {outbreak.recommendations && (
                          <div className="mt-3 p-3 bg-light rounded">
                            <small className="fw-bold">⚠️ Recommendations:</small>
                            <small className="d-block mt-1">{outbreak.recommendations}</small>
                          </div>
                        )}

                        <div className="mt-3">
                          <a href="/book" className="btn btn-sm btn-primary w-100">
                            Book Emergency Service
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="bg-light py-5">
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <h3 className="text-center mb-4">How to Stay Protected</h3>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">🔔</div>
                    <h5>Stay Informed</h5>
                    <p className="text-muted small">
                      Check outbreak alerts regularly for your area
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">🛡️</div>
                    <h5>Take Action</h5>
                    <p className="text-muted small">
                      Book preventive services before outbreaks spread
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">🏥</div>
                    <h5>Seek Help</h5>
                    <p className="text-muted small">
                      Contact verified providers for immediate assistance
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">📊</div>
                    <h5>Report Cases</h5>
                    <p className="text-muted small">
                      Help us track and contain outbreaks in your community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default OutbreakAlerts;
