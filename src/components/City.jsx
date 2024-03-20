import styles from "./City.module.css";
import {useParams} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useEffect} from "react";
import Spinner from "./Spinner.jsx";
import BackButton from "./BackButton.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function City() {
    // Get URL parameters from React Router where the pass parameters in the route are an object (currently only id)
    const {id} = useParams();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const lat = searchParams.get("lat");
    // const lng = searchParams.get("lng");
    // console.log(id);

    // Get current city using custom hook for context API
    const {getCity, currentCity, isLoading} = useCities();

    useEffect(() => {
        // Wrap get city function inside the useEffect hook because it fetches data from the api
        // Pass the id using the route parameters
        getCity(id);
    }, [id]);


    const {cityName, emoji, date, notes} = currentCity;

    if (isLoading) return <Spinner/>
    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{emoji}</span> {cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <BackButton/>
            </div>
        </div>
    );
}

export default City;
