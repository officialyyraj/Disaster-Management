import "./error-states.css";

export const Offline = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon error-icon--warning">
          <span>📡</span>
        </div>
        <h1 className="error-title">No Connection</h1>
        <p className="error-description">
          You're currently offline. Check your internet connection and try again.
        </p>
        <div className="error-details">
          <p>Some cached data may still be available</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="error-button"
        >
          Reconnect
        </button>
      </div>
    </div>
  );
};
