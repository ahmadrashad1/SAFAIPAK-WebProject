import { useEffect, useState } from "react";
import axios from "axios";
import AnimatedSection from "../components/AnimatedSection.jsx";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const ServiceMap = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    loadLocationData();
  }, []);

  const loadLocationData = async () => {
    try {
      const response = await api.get("/api/analytics/location");
      setLocationData(response.data);
    } catch (error) {
      console.error("Failed to load location data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pakistan major cities with approximate coordinates
  const cityCoordinates = {
    "Karachi": { lat: 24.8607, lng: 67.0011 },
    "Lahore": { lat: 31.5497, lng: 74.3436 },
    "Islamabad": { lat: 33.6844, lng: 73.0479 },
    "Faisalabad": { lat: 31.4504, lng: 73.1350 },
    "Multan": { lat: 30.1575, lng: 71.5249 },
    "Peshawar": { lat: 34.0151, lng: 71.5249 },
    "Quetta": { lat: 30.1798, lng: 66.9750 },
    "Rawalpindi": { lat: 33.5651, lng: 73.0169 },
    "Hyderabad": { lat: 25.3792, lng: 68.3683 },
    "Gujranwala": { lat: 32.1617, lng: 74.1883 },
  };

  const hotspots = locationData?.demandHotspots || [];

  return (
    <div className="service-map-page">
      {/* Header */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <AnimatedSection animation="fadeIn">
            <h1 className="display-4 fw-bold mb-3">🗺️ Service Coverage Map</h1>
            <p className="lead mb-0">
              Interactive map showing provider density, service gaps, and demand hotspots across Pakistan
            </p>
          </AnimatedSection>
        </div>
      </section>

      {loading ? (
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Map Visualization */}
          <section className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <AnimatedSection animation="fadeIn">
                    <div className="card border-0 shadow-lg">
                      <div className="card-body p-0">
                        {/* Simple SVG Map of Pakistan */}
                        <div className="position-relative" style={{ backgroundColor: "#f8f9fa", padding: "40px" }}>
                          <svg width="100%" height="500" viewBox="0 0 800 900" style={{ maxWidth: "100%" }}>
                            {/* Pakistan outline (simplified) */}
                            <path
                              d="M 200,100 L 250,50 L 350,80 L 450,120 L 550,150 L 600,200 L 650,300 L 600,400 L 550,500 L 500,600 L 450,700 L 400,750 L 350,780 L 300,750 L 250,700 L 200,650 L 150,550 L 120,450 L 100,350 L 120,250 L 150,150 Z"
                              fill="#e3f2fd"
                              stroke="#1976d2"
                              strokeWidth="3"
                            />

                            {/* City markers */}
                            {Object.entries(cityCoordinates).map(([city, coords]) => {
                              const hotspot = hotspots.find((h) => 
                                h.hotspots?.some((hs) => hs.city === city)
                              );
                              const demand = hotspot?.hotspots?.find((hs) => hs.city === city)?.demand || 0;
                              const radius = Math.min(20 + (demand * 2), 40);
                              
                              // Convert lat/lng to SVG coordinates (simplified projection)
                              const x = ((coords.lng - 60) / 20) * 800;
                              const y = ((38 - coords.lat) / 15) * 900;

                              return (
                                <g key={city}>
                                  <circle
                                    cx={x}
                                    cy={y}
                                    r={radius}
                                    fill={demand > 10 ? "#ff5252" : demand > 5 ? "#ffc107" : "#4caf50"}
                                    opacity="0.6"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedCity(city)}
                                  />
                                  <circle
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill="#fff"
                                  />
                                  <text
                                    x={x}
                                    y={y - radius - 5}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fill="#333"
                                  >
                                    {city}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>

                          <div className="position-absolute top-0 end-0 m-3 bg-white p-3 rounded shadow-sm">
                            <strong className="d-block mb-2">Legend</strong>
                            <div className="d-flex align-items-center mb-1">
                              <div style={{ width: 20, height: 20, backgroundColor: "#4caf50", borderRadius: "50%", opacity: 0.6 }} className="me-2"></div>
                              <small>Low Demand</small>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <div style={{ width: 20, height: 20, backgroundColor: "#ffc107", borderRadius: "50%", opacity: 0.6 }} className="me-2"></div>
                              <small>Medium Demand</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <div style={{ width: 20, height: 20, backgroundColor: "#ff5252", borderRadius: "50%", opacity: 0.6 }} className="me-2"></div>
                              <small>High Demand</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Statistics Panel */}
                <div className="col-lg-4">
                  <AnimatedSection animation="fadeInRight">
                    <div className="card border-0 shadow mb-3">
                      <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">📊 Coverage Statistics</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <small className="text-muted">Provider Density</small>
                          <h3 className="mb-0">{locationData?.providerDensity || 0}</h3>
                          <small>Total Providers</small>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Areas Covered</small>
                          <h3 className="mb-0">{locationData?.coverage?.totalAreas || 0}</h3>
                          <small>Cities</small>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Coverage Rate</small>
                          <h3 className="mb-0">{locationData?.coverage?.coveragePercentage || 0}%</h3>
                          <small>Active Coverage</small>
                        </div>
                        <div>
                          <small className="text-muted">Providers per Area</small>
                          <h3 className="mb-0">{locationData?.coverage?.providersPerArea?.toFixed(1) || 0}</h3>
                          <small>Average</small>
                        </div>
                      </div>
                    </div>

                    {selectedCity && (
                      <div className="card border-0 shadow">
                        <div className="card-header bg-success text-white">
                          <h6 className="mb-0">📍 {selectedCity}</h6>
                        </div>
                        <div className="card-body">
                          <p className="mb-2">
                            <strong>Service Demand:</strong>
                            {hotspots
                              .flatMap((h) => h.hotspots || [])
                              .find((hs) => hs.city === selectedCity)?.demand || 0} bookings
                          </p>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setSelectedCity("")}
                          >
                            Clear Selection
                          </button>
                        </div>
                      </div>
                    )}
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>

          {/* Service Gaps */}
          {locationData?.serviceGaps && locationData.serviceGaps.length > 0 && (
            <section className="bg-light py-5">
              <div className="container">
                <AnimatedSection animation="fadeUp">
                  <h2 className="text-center mb-4">Service Gap Analysis</h2>
                  <p className="text-center text-muted mb-5">
                    Areas where service demand exceeds provider availability
                  </p>
                </AnimatedSection>

                <div className="row g-4">
                  {locationData.serviceGaps.map((gap, idx) => (
                    <div key={idx} className="col-md-4">
                      <AnimatedSection animation="scaleIn" delay={idx * 100}>
                        <div className="card border-warning h-100">
                          <div className="card-body">
                            <h5 className="card-title">{gap.city}</h5>
                            <div className="mb-3">
                              <small className="text-muted">Missing Services:</small>
                              <div className="mt-2">
                                {gap.gaps.map((service, sIdx) => (
                                  <span key={sIdx} className="badge bg-warning text-dark me-1 mb-1">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <small>
                                <strong>Providers:</strong> {gap.providerDensity}
                              </small>
                              <small>
                                <strong>Demand:</strong> {gap.demandLevel}
                              </small>
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Demand Hotspots */}
          <section className="py-5">
            <div className="container">
              <AnimatedSection animation="fadeUp">
                <h2 className="text-center mb-4">Demand Hotspots by Service</h2>
                <p className="text-center text-muted mb-5">
                  Highest demand cities for each service category
                </p>
              </AnimatedSection>

              <div className="row g-4">
                {hotspots.map((hotspot, idx) => (
                  <div key={idx} className="col-md-6">
                    <AnimatedSection animation="fadeInLeft" delay={idx * 100}>
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">{hotspot.serviceType}</h5>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th>City</th>
                                  <th className="text-end">Demand</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(hotspot.hotspots || []).map((hs, hsIdx) => (
                                  <tr key={hsIdx}>
                                    <td>{hs.city}</td>
                                    <td className="text-end">
                                      <span className="badge bg-primary">{hs.demand}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ServiceMap;
