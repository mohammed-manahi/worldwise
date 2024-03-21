import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext.jsx";
// eslint-disable-next-line react/prop-types
export default function CityItem({city}) {
    // Destructure city object
    // eslint-disable-next-line react/prop-types
    const {cityName, country, emoji, date, notes, position, id} = city;

    // Date format function
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));

    // When the current city id equals city id add active style to the city item
    const {currentCity, deleteCity} = useCities();

    function handleDeleteClick(event){
        // Handle delete city click event
        // This prevents the link to be effective in the delete button
        event.preventDefault();
        console.log("TEST");
        deleteCity(id)

    }
    return (
        <li>
            {/* Link to city details using city route */}
            {/* pass the id as the parameter */}
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
                  to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleDeleteClick}>&times;</button>
            </Link>
        </li>
    );
}