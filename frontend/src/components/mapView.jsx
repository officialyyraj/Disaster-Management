import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapView(props) {
  const alerts = props.alert;

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts &&
        alerts.map((alert, index) => (
          <Marker
            key={index}
            position={[
              parseFloat(alert.latitude),
              parseFloat(alert.longitude),
            ]}
          >
            <Popup>{alert.disaster_type}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default MapView;