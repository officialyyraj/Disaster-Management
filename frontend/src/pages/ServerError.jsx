import { Link } from "react-router-dom";
import "./error-states.css";

export const ServerError = ({ message = "Something went wrong on our end" }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon error-icon--error">
          <span>⚠️</span>
        </div>
        <h1 className="error-title">Server Error</h1>
        <p className="error-description">
          {message}
        </p>
        <div className="error-details">
          <p>Our team has been notified and is working on it</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="error-button"
        >
          Retry
        </button>
        <Link to="/" className="error-button error-button--secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};
