import { Link } from "react-router-dom";
import "./error-states.css";

export const NotFound = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <span>�️</span>
        </div>
        <h1 className="error-title">404 - Lost?</h1>
        <p className="error-description">
          We couldn't find the page you're looking for. It might have moved or doesn't exist.
        </p>
        <div className="error-details">
          <p>Let's get you back on track</p>
        </div>
        <Link to="/" className="error-button">
          Return to Safety
        </Link>
      </div>
    </div>
  );
};
