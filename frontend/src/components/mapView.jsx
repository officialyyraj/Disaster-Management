import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView(props) {
    const alerts=props.alert
    return (
        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{height: "1000px",
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block" 
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