import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";

export default function Map() {
    // The useNavigate hook is provided by React Router to navigate to a new URL without click
    const navigate = useNavigate()
    // Extract the query string using searchParams
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        // Use the navigate function of the useNavigate hook to navigate to the form
        <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
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