import { useState } from "react";
import { Link } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import "./reports.css";
const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL ||'http://localhost:5000';
export const Reports = () => {
  const location = useGeoLocation();
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

  const handleGetCurrentLocation = (e) => {
    e.preventDefault();
    if (!location.loaded) {
      alert("Waiting for location permission or browser geolocation.");
      return;
    }
    if (location.error) {
      alert(`Geolocation error: ${location.error.message}`);
      return;
    }
    setForm((prev) => ({
      ...prev,
      latitude: location.coordinates.lat.toString(),
      longitude: location.coordinates.lng.toString(),
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response=await fetch(`${BACKEND_URL}/api/report`,{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(form)
    })
    if(!response.ok){
    throw new Error("Failed to submit report");
    }
    setSubmitted(true);
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
          <button type="button" className="reports-submit" onClick={handleGetCurrentLocation}>
            Get My Current Location
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


