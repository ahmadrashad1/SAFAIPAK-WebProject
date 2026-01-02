import { useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection.jsx";

const ProvidersPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [filterCertification, setFilterCertification] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/providers");
        if (!response.ok) throw new Error("Failed to fetch providers");
        const data = await response.json();
        setProviders(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching providers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Get unique values for filters
  const cities = [...new Set(providers.map((p) => p.city))].sort();
  const specializations = [
    ...new Set(providers.flatMap((p) => p.specialization || [])),
  ].sort();

  // Apply filters
  const filteredProviders = providers.filter((provider) => {
    // Search term
    if (searchTerm && !provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !provider.city.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // City filter
    if (filterCity && provider.city !== filterCity) {
      return false;
    }
    
    // Specialization filter
    if (filterSpecialization && !provider.specialization?.includes(filterSpecialization)) {
      return false;
    }
    
    // Certification filter
    if (filterCertification && provider.certificationLevel !== filterCertification) {
      return false;
    }
    
    // Rating filter
    if (filterRating) {
      const minRating = parseFloat(filterRating);
      if (!provider.rating || provider.rating < minRating) {
        return false;
      }
    }
    
    // Availability filter
    if (filterAvailability === "available" && !provider.available) {
      return false;
    }
    if (filterAvailability === "unavailable" && provider.available) {
      return false;
    }
    
    return true;
  });

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "experience":
        return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
      case "jobs":
        return (b.totalJobs || 0) - (a.totalJobs || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCity("");
    setFilterSpecialization("");
    setFilterCertification("");
    setFilterRating("");
    setFilterAvailability("");
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-secondary">Loading providers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding">
        <div className="container text-center py-5">
          <div className="alert alert-warning" role="alert">
            <h5>⚠️ Could not load providers</h5>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3">Provider Network</h1>
            <p className="text-secondary lead">
              Verified technicians across Pakistan - {providers.length} providers ready to serve
            </p>
          </div>
        </AnimatedSection>

        {/* Advanced Filters */}
        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="mb-3">🔍 Advanced Search & Filters</h5>
              
              {/* Search Bar */}
              <div className="row g-3 mb-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search by provider name or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Options */}
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small">City</label>
                  <select
                    className="form-select"
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label small">Specialization</label>
                  <select
                    className="form-select"
                    value={filterSpecialization}
                    onChange={(e) => setFilterSpecialization(e.target.value)}
                  >
                    <option value="">All Services</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label small">Certification</label>
                  <select
                    className="form-select"
                    value={filterCertification}
                    onChange={(e) => setFilterCertification(e.target.value)}
                  >
                    <option value="">Any Level</option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label small">Min Rating</label>
                  <select
                    className="form-select"
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label small">Availability</label>
                  <select
                    className="form-select"
                    value={filterAvailability}
                    onChange={(e) => setFilterAvailability(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="available">Available Now</option>
                    <option value="unavailable">Currently Busy</option>
                  </select>
                </div>
              </div>

              {/* Sort and Clear */}
              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <label className="form-label small">Sort By</label>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="experience">Most Experience</option>
                    <option value="jobs">Most Jobs</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
                <div className="col-md-6 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-3 text-center">
                <small className="text-muted">
                  Showing {sortedProviders.length} of {providers.length} providers
                </small>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Provider Grid */}
        {sortedProviders.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-secondary">No providers match your filters</h4>
            <p className="text-muted">Try adjusting your search criteria</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {sortedProviders.map((provider, idx) => (
              <div className="col-md-4 col-lg-3" key={provider._id}>
                <AnimatedSection animation="scaleIn" delay={idx * 50}>
                  <div className="card h-100 provider-card card-shadow">
                    <div 
                      className="card-img-top" 
                      style={{
                        height: "150px",
                        background: provider.available
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "linear-gradient(135deg, #999 0%, #666 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "3rem",
                        fontWeight: "bold",
                        position: "relative"
                      }}
                    >
                      {provider.name.charAt(0).toUpperCase()}
                      {provider.verified && (
                        <span
                          className="badge bg-success position-absolute"
                          style={{ top: "10px", right: "10px", fontSize: "0.7rem" }}
                        >
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-semibold mb-0">{provider.name}</h6>
                          <small className="text-muted">📍 {provider.city}</small>
                        </div>
                        <span className={`badge ${provider.available ? "bg-success" : "bg-secondary"}`}>
                          {provider.available ? "Available" : "Busy"}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <span className="badge bg-primary me-1">
                          {provider.certificationLevel}
                        </span>
                        <span className="badge bg-info text-dark">
                          {provider.yearsOfExperience || 0} yrs
                        </span>
                      </div>

                      <small className="text-secondary d-block mb-2">
                        {provider.specialization?.slice(0, 2).join(", ") || "General Services"}
                        {provider.specialization?.length > 2 && ` +${provider.specialization.length - 2} more`}
                      </small>
                      
                      <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                        <span className="text-warning">
                          {"⭐".repeat(Math.round(provider.rating || 0))}
                          <small className="text-muted ms-1">
                            {provider.rating?.toFixed(1) || "N/A"}
                          </small>
                        </span>
                        <small className="text-muted">{provider.totalJobs || 0} jobs</small>
                      </div>

                      <a href="/book" className="btn btn-sm btn-primary w-100 mt-3">
                        Book Service
                      </a>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvidersPage;

