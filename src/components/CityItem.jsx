import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";
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

    return (
        <li>
            {/* Link to city details using city route */}
            <Link className={styles.cityItem} to={`${id}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}