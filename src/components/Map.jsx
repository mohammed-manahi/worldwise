import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";

export default function Map() {
    // The useNavigate hook is provided by React Router to navigate to a new URL without click
    const navigate = useNavigate();
    // Get the global state of cities from the context
    const {cities} = useCities();
    // Define a state to manage map poisiton
    const [mapPosition, setMapPosition] = useState([40, 0]);
    // Extract the query string using searchParams
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        // Use the navigate function of the useNavigate hook to navigate to the form
        <div className={styles.mapContainer} onClick={() => {
            navigate("form")
        }}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {/* Loop over cities to annotate the marker */}
                {cities.map((city) => (<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.emoji}</span>
                        <span>{city.cityName}</span>
                    </Popup>
                </Marker>))}
            </MapContainer>
        </div>
    );
}