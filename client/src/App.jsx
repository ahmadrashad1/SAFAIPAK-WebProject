import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AboutPage from "./pages/About.jsx";
import ProvidersPage from "./pages/Providers.jsx";
import AnalyticsPage from "./pages/Analytics.jsx";
import ThemeSelector from "./components/ThemeSelector.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import AnimatedSection from "./components/AnimatedSection.jsx";
import { useParallax } from "./hooks/useScrollAnimation.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Top Announcement Banner (like Voximplant's "New! Learn about...")
const AnnouncementBanner = () => (
  <div className="announcement-banner">
    <div className="container text-center py-2">
      <small className="text-white">
        New! Emergency pest control services now available 24/7 across all major cities
      </small>
    </div>
  </div>
);

// Hero Section (exact Voximplant style)
const Hero = () => {
  const [parallaxRef, parallaxOffset] = useParallax(0.3);

  return (
    <header className="hero-section">
      <div className="hero-parallax-bg" ref={parallaxRef} style={{ transform: `translateY(${parallaxOffset}px)` }}></div>
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 hero-content-wrapper">
            <AnimatedSection animation="fadeIn" delay={0}>
              <h1 className="hero-title">
                Build Like a Pro<br />
                <span className="hero-subtitle">With Intelligent Sanitation Services</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeIn" delay={200}>
              <p className="hero-description">
                Create and scale better sanitation solutions with fast and flexible services that adapt to your business needs across Pakistan.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fadeIn" delay={400}>
              <div className="hero-cta d-flex gap-3 flex-wrap">
                <Link to="/book" className="btn btn-hero-primary">
                  Book a Service
                </Link>
                <Link to="/services" className="btn btn-hero-secondary">
                  Explore Services
                </Link>
              </div>
            </AnimatedSection>
          </div>
          <div className="col-lg-6 hero-visual">
            <AnimatedSection animation="fadeInRight" delay={300}>
              <div className="hero-illustration">
                {/* Abstract shapes similar to Voximplant */}
                <div className="hero-shape hero-shape-1"></div>
                <div className="hero-shape hero-shape-2"></div>
                <div className="hero-shape hero-shape-3"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </header>
  );
};

// Client Logos Section
const ClientLogos = () => (
  <AnimatedSection animation="fadeUp" threshold={0.2}>
    <section className="client-logos-section py-5">
      <div className="container">
        <AnimatedSection animation="fadeUp" delay={0}>
          <h2 className="section-title text-center mb-4">
            Powering Sanitation Services for Thousands of Households Across Pakistan
          </h2>
        </AnimatedSection>
        <AnimatedSection animation="fadeUp" delay={100}>
          <p className="text-center text-muted mb-5">Trusted by communities nationwide</p>
        </AnimatedSection>
        <div className="row g-4 justify-content-center align-items-center">
          {['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Multan', 'Peshawar'].map((city, idx) => (
            <div className="col-6 col-md-4 col-lg-2 text-center" key={city}>
              <AnimatedSection animation="scaleIn" delay={idx * 100} threshold={0.1}>
                <div className="client-logo-item">
                  <div className="city-badge">{city}</div>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Two-Column Feature Section (Voximplant style)
const FeatureSection = ({ title, subtitle, description, ctaText, ctaLink, imageSide = 'right', children }) => (
  <AnimatedSection animation="fadeUp" threshold={0.15}>
    <section className="feature-section py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          {imageSide === 'left' && (
            <div className="col-lg-6">
              <AnimatedSection animation={imageSide === 'left' ? 'fadeInLeft' : 'fadeInRight'} delay={200}>
                <div className="feature-visual">{children}</div>
              </AnimatedSection>
            </div>
          )}
          <div className="col-lg-6">
            <AnimatedSection animation={imageSide === 'left' ? 'fadeInRight' : 'fadeInLeft'} delay={0}>
              <div className="feature-content">
                <h3 className="feature-subtitle">{subtitle}</h3>
                <h2 className="feature-title">{title}</h2>
                <div className="feature-description">
                  {description}
                </div>
                {ctaText && (
                  <Link to={ctaLink} className="btn btn-feature-cta mt-4">
                    {ctaText}
                  </Link>
                )}
              </div>
            </AnimatedSection>
          </div>
          {imageSide === 'right' && (
            <div className="col-lg-6">
              <AnimatedSection animation="fadeInRight" delay={200}>
                <div className="feature-visual">{children}</div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Platform Overview Section
const PlatformOverview = () => (
  <>
    <FeatureSection
      subtitle="From Emergency Response to Preventive Care"
      title="SafaiPak Platform"
      description={
        <>
          <p className="mb-3">
            Add pest control, sanitation, disinfection, and agricultural services to your home or business. Unlike other service platforms, SafaiPak provides an integrated sanitation experience that includes verified providers, real-time booking, preventive health packages, and comprehensive coverage from urban centers to remote rural areas.
          </p>
          <p>
            Our platform connects certified experts with communities that need them most, ensuring affordable, reliable, and trusted sanitation services across all of Pakistan.
          </p>
        </>
      }
      ctaText="Explore the Platform"
      ctaLink="/services"
      imageSide="right"
    >
      <div className="platform-visual">
        <div className="visual-card card-1">
          <div className="card-icon">🏠</div>
          <div className="card-text">Residential Services</div>
        </div>
        <div className="visual-card card-2">
          <div className="card-icon">🏢</div>
          <div className="card-text">Commercial Services</div>
        </div>
        <div className="visual-card card-3">
          <div className="card-icon">🌾</div>
          <div className="card-text">Agricultural Services</div>
        </div>
      </div>
    </FeatureSection>

    <FeatureSection
      subtitle="No-Code Service Booking for Everyone"
      title="SafaiPak Customer Portal"
      description={
        <>
          <p className="mb-3">
            Book verified sanitation experts instantly using our easy-to-use platform designed for homeowners, businesses, and farmers. Find providers by location, service type, budget, and urgency—all with transparent pricing and instant quotes.
          </p>
          <p>
            Our intelligent booking system handles everything from same-day emergency services to recurring preventive care packages, making it simple to protect your property and health.
          </p>
        </>
      }
      ctaText="Book Now"
      ctaLink="/book"
      imageSide="left"
    >
      <div className="booking-visual">
        <div className="booking-card">
          <div className="booking-header">Quick Booking</div>
          <div className="booking-steps">
            <div className="step">1. Select Service</div>
            <div className="step">2. Choose Provider</div>
            <div className="step">3. Confirm Booking</div>
          </div>
        </div>
      </div>
    </FeatureSection>
  </>
);

// "We're a Company You Can Grow With" Section
const CompanyFeatures = () => (
  <section className="company-features-section py-5">
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="section-title">We're a Platform You Can Trust</h2>
      </div>
      <div className="row g-4">
        {[
          {
            icon: "🛡️",
            title: "Verified Providers",
            description: "Every provider is background-checked and certified. Never feel uncertain about service quality. Our team ensures all experts meet strict verification standards."
          },
          {
            icon: "🌍",
            title: "Nationwide Coverage",
            description: "Service available across all provinces. With coverage in 45+ districts from Karachi to Gilgit-Baltistan, we've got you covered throughout Pakistan."
          },
          {
            icon: "⚡",
            title: "Reliability & Speed",
            description: "Scale reliably with enterprise-grade service delivery. Average response time of 45 minutes for emergencies, 99% on-time completion rate."
          },
          {
            icon: "🚀",
            title: "Fast Service Delivery",
            description: "Set up and get services quickly across all major cities. Same-day booking available for urgent needs, with optimized routing for efficiency."
          },
          {
            icon: "💰",
            title: "Transparent Pricing",
            description: "Pay only for what you need with clear, upfront pricing. No hidden fees, instant quotes, and flexible payment options for every budget."
          },
          {
            icon: "🔧",
            title: "Easy-to-Use Platform",
            description: "Simple booking process designed for everyone. Whether you're tech-savvy or prefer phone booking, we make sanitation services accessible to all."
          }
        ].map((feature, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h4 className="feature-card-title">{feature.title}</h4>
              <p className="feature-card-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Stats Section
const StatsSection = () => (
  <AnimatedSection animation="fadeUp" threshold={0.2}>
    <section className="stats-section py-5">
      <div className="container">
        <AnimatedSection animation="fadeUp" delay={0}>
          <h2 className="section-title text-center mb-5">The backbone for sanitation services across Pakistan</h2>
        </AnimatedSection>
        <div className="row g-4 text-center">
          {[
            { value: "45+", label: "Districts covered" },
            { value: "15k+", label: "Households protected" },
            { value: "800+", label: "Certified providers" },
            { value: "99%", label: "On-time completion" }
          ].map((stat, idx) => (
            <div className="col-6 col-lg-3" key={idx}>
              <AnimatedSection animation="countUp" delay={idx * 150} threshold={0.1}>
                <div className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Getting Started Section
const GettingStarted = () => (
  <AnimatedSection animation="fadeUp" threshold={0.2}>
    <section className="getting-started-section py-5">
      <div className="container">
        <AnimatedSection animation="scaleIn" delay={0}>
          <div className="getting-started-card">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2 className="getting-started-title">Getting Started is easy</h2>
                <p className="getting-started-description">
                  We have affordable service packages available to get you started right away.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link to="/book" className="btn btn-getting-started">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </AnimatedSection>
);

// Contact Form Section
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    source: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Submitting..." });
    try {
      await api.post("/api/bookings", formData);
      setStatus({ type: "success", message: "Thank you! We'll contact you shortly." });
      setFormData({ name: "", email: "", phone: "", message: "", source: "" });
    } catch (error) {
      setStatus({ type: "error", message: "Submission failed. Please try again." });
    }
  };

  return (
    <AnimatedSection animation="fadeUp" threshold={0.15}>
      <section className="contact-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <AnimatedSection animation="fadeUp" delay={0}>
                <h2 className="section-title text-center mb-4">Contact Us</h2>
                <p className="text-center text-muted mb-5">
                  One of our experts will get in touch with you shortly.
                </p>
                <p className="text-center text-muted small mb-4">
                  Online Support is available 24x7
                </p>
              </AnimatedSection>
              <form onSubmit={handleSubmit} className="contact-form">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First and last name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">How did you hear about us? *</label>
                  <select
                    name="source"
                    required
                    value={formData.source}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="privacy" required />
                    <label className="form-check-label small" htmlFor="privacy">
                      By clicking here I have read and accept SafaiPak Privacy Policy.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-contact-submit w-100">
                    {status.type === "loading" ? "Submitting..." : "Submit"}
                  </button>
                  {status.message && (
                    <div className={`alert mt-3 ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
                      {status.message}
                    </div>
                  )}
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

// Problem & Vision Section
const ProblemVisionSection = () => (
  <AnimatedSection animation="fadeUp" threshold={0.15}>
    <section className="problem-vision-section py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <AnimatedSection animation="fadeInLeft" delay={0}>
              <h2 className="section-title mb-4">The Problem That Inspired Us</h2>
              <div className="problem-content">
                <p className="mb-3">
                  In the summer of 2023, in a small village near Lahore, 8-year-old Ayesha lost her battle with dengue fever. Her father, a daily wage laborer, had spent days searching for affordable pest control services, but found only expensive corporate companies or unreliable local providers.
                </p>
                <p className="mb-3">
                  Meanwhile, in Karachi, Hassan, a skilled pest control technician with 15 years of experience struggled to find consistent work, unaware that just kilometers away, families desperately needed his expertise.
                </p>
                <p>
                  This disconnect is the problem we solve. Every year, thousands of Pakistanis suffer from dengue, malaria, and other vector-borne diseases, while skilled service providers remain underemployed due to lack of visibility and trust.
                </p>
              </div>
            </AnimatedSection>
          </div>
          <div className="col-lg-6">
            <AnimatedSection animation="fadeInRight" delay={200}>
              <h2 className="section-title mb-4">Vision</h2>
              <div className="vision-content">
                <p className="mb-3">
                  SafaiPak (meaning "Clean Pakistan") is more than a business—it's a movement to create a healthier, safer Pakistan by connecting verified sanitation experts with communities that need them most, from the bustling streets of Karachi to the remote valleys of Gilgit-Baltistan.
                </p>
                <h4 className="mb-3">Platform Definition</h4>
                <p>
                  SafaiPak is a digital marketplace that connects certified pest control and sanitation service providers with residential and commercial customers across Pakistan, with special focus on preventive healthcare services.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Services Portfolio Section
const ServicesPortfolio = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback services data in case API fails
  const fallbackServices = [
    {
      category: "Pest Control Services",
      focus: "Residential & commercial vector control",
      services: [
        "Mosquito & Dengue Control: Fogging, spraying, larvicide treatment",
        "Termite Control: Pre-construction, post-construction treatments",
        "Rodent Control: Trapping, poisoning, exclusion services",
        "Insect Control: Cockroach, bed bug, ant, and fly elimination",
        "Bird Control: Nest removal, deterrent installation",
      ],
    },
    {
      category: "Sanitation & Cleaning Services",
      focus: "Infrastructure hygiene and deep cleaning",
      services: [
        "Gutter Cleaning: Residential and commercial drainage systems",
        "Water Tank Cleaning: Overhead and underground tank sanitization",
        "Septic Tank Cleaning: Emptying and disinfecting services",
        "General Deep Cleaning: Post-construction, seasonal, move-in/out cleaning",
      ],
    },
    {
      category: "Specialized Health Services",
      focus: "Preventive disinfection & indoor air quality",
      services: [
        "Disinfection Services: COVID-19, bacterial, viral disinfection",
        "Air Quality Services: Mold remediation, air duct cleaning",
        "Waste Management: Temporary waste disposal solutions",
      ],
    },
    {
      category: "Agricultural Services",
      focus: "Crop-specific pest control and farm protection",
      services: [
        "Crop-Specific Pest Control: Cotton, rice, wheat, and orchard protection",
        "Farm Size & Topography Adaptation: Tailored solutions for all farm sizes",
        "Agricultural Emergency Services: 24/7 rapid response teams",
        "Soil Health Services: Fumigation, pH balancing, beneficial microbe application",
        "Storage & Post-Harvest Protection: Grain storage pest control",
      ],
      seasonalPackages: [
        {
          name: "Kharif Ready Package (April-June)",
          highlights: [
            "Pre-monsoon pest prevention",
            "Soil preparation treatments",
            "Seed treatment services",
          ],
        },
        {
          name: "Rabi Protection Package (October-December)",
          highlights: [
            "Winter pest control",
            "Storage facility preparation",
            "Equipment maintenance",
          ],
        },
        {
          name: "Orchard Care Program",
          highlights: [
            "Fruit fly management",
            "Tree injection services",
            "Beneficial insect release",
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/services")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        } else {
          setServices(fallbackServices);
        }
      })
      .catch(() => {
        // If API fails, use fallback data
        setServices(fallbackServices);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AnimatedSection animation="fadeUp" threshold={0.15}>
      <section className="services-portfolio-section py-5">
        <div className="container">
          <AnimatedSection animation="fadeUp" delay={0}>
            <h2 className="section-title text-center mb-2">Core Services Portfolio</h2>
            <p className="text-center text-muted mb-5">Comprehensive sanitation solutions for every need</p>
          </AnimatedSection>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No services available at the moment.</p>
            </div>
          ) : (
            <div className="row g-4">
              {services.map((item, idx) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <AnimatedSection animation="scaleIn" delay={idx * 100} threshold={0.1}>
                    <div className="service-portfolio-card floating-card">
                  <div className="mb-3">
                    <span className="badge" style={{
                      background: 'linear-gradient(135deg, var(--purple-primary), var(--purple-light))',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem'
                    }}>
                      {item.focus}
                    </span>
                  </div>
                  <h4 className="service-portfolio-title">{item.category}</h4>
                  <ul className="service-portfolio-list">
                    {item.services?.map((svc, i) => (
                      <li key={i}>{svc}</li>
                    ))}
                  </ul>
                  {item.seasonalPackages && (
                    <div className="seasonal-packages mt-4 pt-3 border-top">
                      <strong className="d-block mb-2" style={{ color: 'var(--purple-primary)' }}>Seasonal Packages:</strong>
                      <ul className="mt-2" style={{ listStyle: 'none', paddingLeft: 0 }}>
                        {item.seasonalPackages.map((pkg, i) => (
                          <li key={i} className="small mb-2">
                            <strong>{pkg.name}</strong>
                            {pkg.highlights && (
                              <ul className="mt-1" style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                                {pkg.highlights.map((h, j) => (
                                  <li key={j} className="small" style={{ color: '#6b7280' }}>• {h}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    )}
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimatedSection>
  );
};

// Footer
const Footer = () => (
  <footer className="main-footer">
    <div className="container">
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <h5 className="footer-title">Products</h5>
          <ul className="footer-links">
            <li><Link to="/services">SafaiPak Platform</Link></li>
            <li><Link to="/providers">Provider Network</Link></li>
            <li><Link to="/analytics">Analytics Dashboard</Link></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="footer-title">Solutions</h5>
          <ul className="footer-links">
            <li><Link to="/services">Pest Control</Link></li>
            <li><Link to="/services">Sanitation Services</Link></li>
            <li><Link to="/services">Agricultural Services</Link></li>
            <li><Link to="/book">Emergency Services</Link></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="footer-title">Documentation</h5>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/providers">Provider Guide</Link></li>
            <li><Link to="/analytics">Platform Features</Link></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="footer-title">Help</h5>
          <ul className="footer-links">
            <li><a href="#contact">Contact Support</a></li>
            <li><Link to="/book">Book Service</Link></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 small">
              SafaiPak© {new Date().getFullYear()} SafaiPak®. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="footer-legal-links">
              <a href="#privacy" className="small me-3">Privacy policy</a>
              <a href="#terms" className="small me-3">Terms of service</a>
              <a href="#contact" className="small">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// Navigation Component
const Navigation = () => (
  <nav className="main-navbar">
    <div className="container">
      <div className="navbar-content">
        <Link className="navbar-brand" to="/">SafaiPak</Link>
        <div className="navbar-menu">
          <div className="nav-dropdown">
            <span className="nav-link">Services</span>
            <div className="dropdown-menu">
              <Link to="/services" className="dropdown-item">All Services</Link>
              <Link to="/services#pest-control" className="dropdown-item">Pest Control</Link>
              <Link to="/services#sanitation" className="dropdown-item">Sanitation</Link>
              <Link to="/services#agricultural" className="dropdown-item">Agricultural</Link>
            </div>
          </div>
          <Link className="nav-link" to="/providers">Providers</Link>
          <Link className="nav-link" to="/analytics">Analytics</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/book">Book</Link>
        </div>
        <div className="navbar-actions">
          <ThemeSelector />
          <Link to="/book" className="btn btn-nav-primary">Contact Us</Link>
          <Link to="/book" className="btn btn-nav-secondary">Book Service</Link>
        </div>
      </div>
    </div>
  </nav>
);

// Layout Component
const Layout = ({ children }) => (
  <>
    <ScrollProgress />
    <AnnouncementBanner />
    <Navigation />
    {children}
    <Footer />
  </>
);

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Hero />
              <ClientLogos />
              <PlatformOverview />
              <ProblemVisionSection />
              <ServicesPortfolio />
              <CompanyFeatures />
              <StatsSection />
              <GettingStarted />
              <ContactForm />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <ServicesPortfolio />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <ProblemVisionSection />
              <CompanyFeatures />
            </Layout>
          }
        />
        <Route
          path="/providers"
          element={
            <Layout>
              <ProvidersPage />
            </Layout>
          }
        />
        <Route
          path="/analytics"
          element={
            <Layout>
              <AnalyticsPage />
            </Layout>
          }
        />
        <Route
          path="/book"
          element={
            <Layout>
              <ContactForm />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
