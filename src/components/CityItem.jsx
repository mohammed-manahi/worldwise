import styles from "./CityItem.module.css"
// eslint-disable-next-line react/prop-types
export default function CityItem({city}) {
    // Destructure city object
    // eslint-disable-next-line react/prop-types
    const { cityName, country, emoji, date, notes, position, id } = city;

    // Date format function
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));

    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}