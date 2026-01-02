import { useState, useEffect } from "react";
import axios from "axios";
import AnimatedSection from "../components/AnimatedSection.jsx";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const FarmerPortal = () => {
  const [seasonalPackages, setSeasonalPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [servicesRes, packagesRes] = await Promise.all([
        api.get("/api/services"),
        api.get("/api/seasonal-packages"),
      ]);

      setServices(servicesRes.data);
      setSeasonalPackages(packagesRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const agriculturalServices = services.find((cat) => cat.category === "Agriculture");

  return (
    <div className="farmer-portal">
      {/* Hero Section */}
      <section className="bg-success text-white py-5">
        <div className="container">
          <AnimatedSection animation="fadeIn">
            <h1 className="display-4 fw-bold mb-3">🌾 Farmer Portal</h1>
            <p className="lead mb-4">
              Crop-specific pest control, seasonal packages, and agricultural expertise 
              to protect your harvest and maximize yield.
            </p>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card bg-white text-dark">
                  <div className="card-body text-center">
                    <div className="display-4 mb-2">🚜</div>
                    <h5>Farm Services</h5>
                    <p className="mb-0 small text-muted">
                      Customized treatments for all farm sizes
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-white text-dark">
                  <div className="card-body text-center">
                    <div className="display-4 mb-2">📦</div>
                    <h5>Seasonal Packages</h5>
                    <p className="mb-0 small text-muted">
                      Kharif, Rabi & Orchard protection
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-white text-dark">
                  <div className="card-body text-center">
                    <div className="display-4 mb-2">🎓</div>
                    <h5>Expert Advice</h5>
                    <p className="mb-0 small text-muted">
                      IPM strategies & crop health monitoring
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Seasonal Packages */}
      <section className="py-5">
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-center mb-4">Seasonal Protection Packages</h2>
            <p className="text-center text-muted mb-5">
              Comprehensive treatments tailored to each growing season
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {agriculturalServices?.seasonalPackages?.map((pkg, idx) => (
                <div key={idx} className="col-md-4">
                  <AnimatedSection animation="scaleIn" delay={idx * 100}>
                    <div className="card h-100 border-success">
                      <div className="card-header bg-success text-white">
                        <h5 className="mb-0">{pkg.name}</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled">
                          {pkg.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="mb-2">
                              <span className="text-success">✓</span> {highlight}
                            </li>
                          ))}
                        </ul>
                        <button
                          className="btn btn-success w-100 mt-3"
                          onClick={() => setSelectedPackage(pkg)}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Agricultural Services */}
      {agriculturalServices && (
        <section className="bg-light py-5">
          <div className="container">
            <AnimatedSection animation="fadeUp">
              <h2 className="text-center mb-4">Agricultural Services</h2>
              <p className="text-center text-muted mb-5">
                {agriculturalServices.focus}
              </p>
            </AnimatedSection>

            <div className="row g-4">
              {agriculturalServices.services.map((service, idx) => (
                <div key={idx} className="col-md-6">
                  <AnimatedSection animation="fadeInLeft" delay={idx * 100}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-success">
                          <span className="me-2">🌱</span>
                          {service.split(":")[0] || service}
                        </h5>
                        <p className="card-text text-muted">
                          {service.split(":")[1] || "Comprehensive service for your agricultural needs"}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Crop-Specific Solutions */}
      <section className="py-5">
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-center mb-4">Crop-Specific Protection Programs</h2>
            <p className="text-center text-muted mb-5">
              Tailored pest management for your specific crops
            </p>
          </AnimatedSection>

          <div className="row g-4">
            <div className="col-md-6">
              <AnimatedSection animation="fadeInLeft">
                <div className="card border-warning h-100">
                  <div className="card-header bg-warning">
                    <h5 className="mb-0">🌾 Cotton Protection Suite</h5>
                  </div>
                  <div className="card-body">
                    <ul className="mb-0">
                      <li>Bollworm monitoring and control</li>
                      <li>Sucking pest management</li>
                      <li>Weed control in BT cotton</li>
                      <li>Harvest aid applications</li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="col-md-6">
              <AnimatedSection animation="fadeInRight">
                <div className="card border-info h-100">
                  <div className="card-header bg-info text-white">
                    <h5 className="mb-0">🌾 Rice Protection Program</h5>
                  </div>
                  <div className="card-body">
                    <ul className="mb-0">
                      <li>Stem borer control</li>
                      <li>Bacterial leaf blight prevention</li>
                      <li>Water management integration</li>
                      <li>Storage pest prevention</li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="col-md-6">
              <AnimatedSection animation="fadeInLeft" delay={100}>
                <div className="card border-success h-100">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">🌽 Wheat & Grain Protection</h5>
                  </div>
                  <div className="card-body">
                    <ul className="mb-0">
                      <li>Aphid and rust management</li>
                      <li>Pre-harvest disease control</li>
                      <li>Post-harvest fumigation</li>
                      <li>Storage facility preparation</li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="col-md-6">
              <AnimatedSection animation="fadeInRight" delay={100}>
                <div className="card border-danger h-100">
                  <div className="card-header bg-danger text-white">
                    <h5 className="mb-0">🍅 Vegetable & Orchard Care</h5>
                  </div>
                  <div className="card-body">
                    <ul className="mb-0">
                      <li>Fruit fly management</li>
                      <li>Tree injection services</li>
                      <li>Beneficial insect release</li>
                      <li>Organic pest solutions</li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Size Adaptation */}
      <section className="bg-light py-5">
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-center mb-4">Services for Every Farm Size</h2>
            <p className="text-center text-muted mb-5">
              From small holdings to large commercial farms
            </p>
          </AnimatedSection>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="display-4 mb-3">🏡</div>
                  <h5>Small Farms</h5>
                  <p className="text-muted small mb-0">Up to 10 acres</p>
                  <p className="small">Manual spraying, targeted treatments</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="display-4 mb-3">🚜</div>
                  <h5>Medium Farms</h5>
                  <p className="text-muted small mb-0">10-50 acres</p>
                  <p className="small">Mechanical sprayers, drone services</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="display-4 mb-3">🏭</div>
                  <h5>Large Farms</h5>
                  <p className="text-muted small mb-0">50-200 acres</p>
                  <p className="small">Tractor-mounted equipment, IPM plans</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="display-4 mb-3">🌍</div>
                  <h5>Commercial</h5>
                  <p className="text-muted small mb-0">200+ acres</p>
                  <p className="small">Aerial spraying, precision agriculture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Hub */}
      <section className="py-5">
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-center mb-4">Agricultural Knowledge Hub</h2>
            <p className="text-center text-muted mb-5">
              Expert guidance and resources for farmers
            </p>
          </AnimatedSection>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">📚 Pest Guides</h5>
                  <p className="card-text text-muted">
                    Identification and management strategies for common agricultural pests
                  </p>
                  <a href="/book" className="btn btn-outline-success">Browse Guides</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">📊 Crop Calendars</h5>
                  <p className="card-text text-muted">
                    Seasonal treatment schedules and preventive care timelines
                  </p>
                  <a href="/book" className="btn btn-outline-success">View Calendars</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🎓 Training Videos</h5>
                  <p className="card-text text-muted">
                    Learn IPM techniques, safe pesticide use, and best practices
                  </p>
                  <a href="/book" className="btn btn-outline-success">Watch Videos</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-success text-white py-5">
        <div className="container text-center">
          <AnimatedSection animation="fadeIn">
            <h2 className="mb-3">Ready to Protect Your Crops?</h2>
            <p className="lead mb-4">
              Book a consultation with our agricultural experts today
            </p>
            <a href="/book" className="btn btn-light btn-lg">
              Request Farm Visit
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Package Modal */}
      {selectedPackage && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedPackage(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">{selectedPackage.name}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedPackage(null)}
                ></button>
              </div>
              <div className="modal-body">
                <h6>Package Includes:</h6>
                <ul>
                  {selectedPackage.highlights.map((highlight, idx) => (
                    <li key={idx} className="mb-2">{highlight}</li>
                  ))}
                </ul>
                <div className="alert alert-info mt-3">
                  <strong>💡 Note:</strong> Packages can be customized based on your farm size, 
                  crop type, and specific needs.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedPackage(null)}
                >
                  Close
                </button>
                <a href="/book" className="btn btn-success">
                  Book This Package
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerPortal;
