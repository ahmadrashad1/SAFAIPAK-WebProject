const AboutPage = () => (
  <div className="section-padding bg-light-pattern">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-6">
          <h1 className="fw-bold mb-3">About SafaiPak</h1>
          <p className="lead text-secondary">
            SafaiPak is Pakistan's premier platform connecting verified pest control,
            sanitation, and agricultural protection experts with families, businesses, and farmers.
          </p>
          <ul className="list-unstyled checklist">
            <li className="mb-2">Founded to fight dengue, malaria, and vector-borne diseases.</li>
            <li className="mb-2">Built for both urban neighborhoods and remote villages.</li>
            <li className="mb-2">Verified providers with digital certificates and ratings.</li>
          </ul>
        </div>
        <div className="col-lg-6">
          <div className="card card-shadow h-100">
            <div className="card-body">
              <h5 className="fw-semibold">Our mission</h5>
              <p className="text-secondary">
                Clean Pakistan, safe Pakistan. We reduce disease spread, protect harvests,
                and create income opportunities for certified technicians.
              </p>
              <div className="row g-3">
                {[
                  { title: "Health First", desc: "Preventive sanitation and disinfection." },
                  { title: "Trust & Safety", desc: "Background checks, badges, completion certificates." },
                  { title: "Access Everywhere", desc: "Digital matching and optimized routing across provinces." },
                ].map((item) => (
                  <div className="col-md-4" key={item.title}>
                    <div className="border rounded p-3 h-100 text-center">
                      <div className="fw-semibold">{item.title}</div>
                      <small className="text-secondary d-block mt-1">{item.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;

