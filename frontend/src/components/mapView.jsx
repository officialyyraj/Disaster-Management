import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView(props) {
    const alerts=props.alert
    return (
        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{
                height: "500px",
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
            }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                alerts && alerts.map((alert, index) => {
                    return (
                        <Marker
                            key={index}
                            position={[alert.latitude, alert.longitude]}
                        >
                            <Popup>{alert.disaster_type}</Popup>
                        </Marker>
                    );
                })
            }
            
        </MapContainer>
    );
}

export default MapView;