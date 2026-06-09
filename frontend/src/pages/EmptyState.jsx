import { Link } from "react-router-dom";
import "./error-states.css";

export const EmptyState = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <span>📭</span>
        </div>
        <h1 className="error-title">All Clear!</h1>
        <p className="error-description">
          No active disaster alerts at the moment. Your area is safe and monitored.
        </p>
        <div className="error-details">
          <p>✓ We're continuously monitoring for any developments</p>
        </div>
        <Link to="/" className="error-button">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
