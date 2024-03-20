import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";

export default function Map() {
    // Get the global state of cities from the context
    const {cities} = useCities();
    // Define a state to manage map position
    const [mapPosition, setMapPosition] = useState([40, 0]);
    // Extract the query string using searchParams
    const [searchParams, setSearchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(function () {
        // Sync map latitude and longitude with the set map position state function
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    return (
        // Use the navigate function of the useNavigate hook to navigate to the form
        <div className={styles.mapContainer}>
            <MapContainer center={mapPosition} zoom={8} scrollWheelZoom={true} className={styles.map}>
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
                {/* Use change center component to manage map position */}
                <ChangeCenter position={mapPosition}/>
                {/* Use detect click component to navigate current position click to the form  */}
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({position}) {
    // A component function to change the map center (lat, lng) coordination
    // Leaflet provides a custom hook to manage map
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    // A component to detect user click on the map
    // The useNavigate hook is provided by React Router to navigate to a new URL without click
    const navigate = useNavigate();
    // Leaflet provides a custom hook to manage map click event
    useMapEvents({
        click: (e) => {
            console.log(e);
            // Add lat and lng positions for navigating to the form with a query string values
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    })
}