import styles from "./Map.module.css"
import {useSearchParams} from "react-router-dom";

export default function Map() {
    // Extract the query string using searchParams
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer}>
            <h1>Map</h1>
            <h2>Position: {lat}, {lng}</h2>
            {/* Update the query string using setSearchParams */}
            <button onClick={
                () => (
                    setSearchParams({lat:23, lng: 25})
                )}>Update Position coordination
            </button>
        </div>
    );
}