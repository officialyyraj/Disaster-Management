import { useState } from "react";
import { Link } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import "./reports.css";
const BACKEND_URL =  'http://localhost:5000';//import.meta.env.VITE_BACKEND_URL ||
export const Reports = () => {
  const location = useGeoLocation();
  const [form, setForm] = useState({
    type: "",
    description: "",
    latitude: "",
    longitude: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
  const { name, value } = e.target;
  let newValue = value;
  
  if (name === 'latitude' || name === 'longitude') {
    newValue = value === '' ? '' : parseFloat(value);
  } else if (name === 'type' || name === 'description') {
    newValue = value.toLowerCase();
  }
  
  setForm((prev) => ({
    ...prev,
    [name]: newValue,
  }));
  setError("");
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
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${BACKEND_URL}/api/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          latitude: typeof form.latitude === 'string' ? parseFloat(form.latitude) : form.latitude,
          longitude: typeof form.longitude === 'string' ? parseFloat(form.longitude) : form.longitude
        })
      });
      
      const data = await response.json();
      
      if (response.status === 429) {
        setError("Rate limit exceeded. You have submitted too many reports. Please wait 15 minutes before trying again.");
        return;
      }
      
      if (response.status === 400) {
        setError(`Validation error: ${data.errors?.fieldErrors ? Object.values(data.errors.fieldErrors).flat().join(", ") : "Invalid data"}`);
        return;
      }
      
      if (!response.ok) {
        setError(data.message || "Failed to submit report");
        return;
      }
      
      setSubmitted(true);
      setForm({
        type: "",
        description: "",
        latitude: "",
        longitude: "",
      });
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
    }
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
            <select
              className="reports-input"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select a disaster type</option>
              <option value="flood">Flood</option>
              <option value="fire">Fire</option>
              <option value="earthquake">Earthquake</option>
              <option value="cyclone">Cyclone</option>
              <option value="landslide">Landslide</option>
            </select>
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
        {error && (
          <div className="reports-error">
            {error}
          </div>
        )}
        
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


