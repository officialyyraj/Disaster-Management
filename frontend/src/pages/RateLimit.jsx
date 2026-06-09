import { Link } from "react-router-dom";
import "./error-states.css";

export const RateLimit = ({ minutes = 15 }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon error-icon--warning">
          <span>⏱️</span>
        </div>
        <h1 className="error-title">Slow Down!</h1>
        <p className="error-description">
          You've submitted reports too quickly. Please wait {minutes} minutes before submitting again.
        </p>
        <div className="error-details">
          <p>This helps us maintain service quality and prevent abuse</p>
        </div>
        <Link to="/" className="error-button">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
