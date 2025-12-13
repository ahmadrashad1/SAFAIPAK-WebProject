const metrics = [
  { label: "Dengue risk hotspots monitored", value: "63 cities" },
  { label: "Avg. emergency dispatch", value: "45 min" },
  { label: "Repeat farmer retention", value: "82%" },
  { label: "Chemical usage reduction", value: "28%" },
];

const AnalyticsPage = () => (
  <div className="section-padding bg-light-pattern">
    <div className="container">
      <div className="row g-4 align-items-start">
        <div className="col-lg-5">
          <h1 className="fw-bold mb-3">Business & Health Intelligence</h1>
          <p className="text-secondary">
            Demand heatmaps, outbreak predictions, and performance benchmarking to keep communities safe and providers productive.
          </p>
          <ul className="list-unstyled checklist">
            <li className="mb-2">Seasonal outbreak predictions for dengue and locusts.</li>
            <li className="mb-2">Route optimization for multi-stop service days.</li>
            <li className="mb-2">Earnings and utilization dashboards for providers.</li>
          </ul>
        </div>
        <div className="col-lg-7">
          <div className="row g-4">
            {metrics.map((m) => (
              <div className="col-md-6" key={m.label}>
                <div className="p-4 bg-white stat-card h-100">
                  <div className="h4 fw-bold mb-1">{m.value}</div>
                  <div className="text-secondary">{m.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card card-shadow mt-4">
            <div className="card-body">
              <h5 className="fw-semibold">Geo Coverage</h5>
              <p className="text-secondary mb-1">Coverage focus: Karachi, Lahore, Islamabad, Quetta, Peshawar, Multan, Gilgit-Baltistan.</p>
              <p className="text-secondary mb-0">Rural outreach: flood-prone villages, agricultural belts, and peri-urban slums.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsPage;

