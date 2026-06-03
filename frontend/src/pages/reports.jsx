import { useState } from "react";
import { Link } from "react-router-dom";
import "./reports.css";
export const Reports = () => {
  const [form, setForm] = useState({
    type: "",
    description: "",
    latitude: "",
    longitude: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Report submitted", form);
  };

  return (
    <div className="reports-page">
      <div className="reports-card">
        <div className="reports-header">
          <h1 className="reports-title">New Report</h1>
          <p className="reports-subtitle">
            Enter the report details and location so the response team can act quickly.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="reports-label">
            Type
            <input
              className="reports-input"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="e.g. Flood, Fire, Earthquake"
              required
            />
          </label>

          <label className="reports-label">
            Description
            <textarea
              className="reports-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the situation in detail"
              rows={5}
              required
            />
          </label>

          <div className="reports-grid">
            <label className="reports-label">
              Latitude
              <input
                className="reports-input"
                name="latitude"
                type="number"
                value={form.latitude}
                onChange={handleChange}
                placeholder="e.g. 40.7128"
                step="any"
                required
              />
            </label>

            <label className="reports-label">
              Longitude
              <input
                className="reports-input"
                name="longitude"
                type="number"
                value={form.longitude}
                onChange={handleChange}
                placeholder="e.g. -74.0060"
                step="any"
                required
              />
            </label>
          </div>

          <button type="submit" className="reports-submit">
            Submit report
          </button>
        </form>

        {submitted && (
          <div className="reports-success">
            Report input captured successfully.
          </div>
        )}
      </div>
      <Link to="/" className="reports-back-link">← Back to Alerts</Link>
    </div>
  );
};


