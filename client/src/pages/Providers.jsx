const providerCards = [
  {
    name: "Hassan - Karachi",
    specialty: "Dengue fogging & rodent control",
    experience: "15 yrs",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sadia - Lahore",
    specialty: "Water tank cleaning & disinfection",
    experience: "11 yrs",
    img: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Baloch Team - Quetta",
    specialty: "Termite & foundation protection",
    experience: "18 yrs",
    img: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Khalid - Faisalabad",
    specialty: "Cotton IPM & soil fumigation",
    experience: "13 yrs",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
  },
];

const ProvidersPage = () => (
  <div className="section-padding">
    <div className="container">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Provider Network</h1>
        <p className="text-secondary">
          Verified technicians across Karachi, Lahore, Islamabad, Quetta, Gilgit-Baltistan, and rural belts.
        </p>
      </div>
      <div className="row g-4">
        {providerCards.map((p) => (
          <div className="col-md-3" key={p.name}>
            <div className="card h-100 provider-card card-shadow">
              <img src={p.img} alt={p.name} />
              <div className="card-body">
                <div className="fw-semibold d-flex justify-content-between">
                  <span>{p.name}</span>
                  <span className="badge bg-primary-subtle text-primary">{p.experience}</span>
                </div>
                <small className="text-secondary d-block mt-1">{p.specialty}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-4 mt-4">
        <div className="col-lg-4">
          <div className="card h-100 card-shadow">
            <div className="card-body">
              <h5 className="fw-semibold">Verification</h5>
              <p className="text-secondary">CNIC checks, police verification, training certificates, and service badges.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100 card-shadow">
            <div className="card-body">
              <h5 className="fw-semibold">Dispatch & Routing</h5>
              <p className="text-secondary">Geo-tagged assignments, route optimization, and ETA tracking for emergencies.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100 card-shadow">
            <div className="card-body">
              <h5 className="fw-semibold">Ratings & Coaching</h5>
              <p className="text-secondary">Customer feedback loops, refresher courses, and performance incentives.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProvidersPage;

