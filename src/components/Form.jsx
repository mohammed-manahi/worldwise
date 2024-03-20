// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import BackButton from "./BackButton.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const geocodeReverserUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    // useNavigate hook to go back
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");

    const [emoji, setEmoji] = useState("");

    const [geocodingError, setGeocodingError] = useState("");

    // Invoke custom hook to get the position data from the url
    const {lat, lng} = useUrlPosition();

    // Create states to manage fetching the position data from url provided by the custom hook
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

    useEffect(function () {
        // Get the data of position from the custom hook use url position
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError("");
                const response = await fetch(`${geocodeReverserUrl}?latitude=${lat}&longitude=${lng}`);
                const data = await response.json();
                console.log(data)
                if (!data.countryCode) throw new Error("The selected location does not seem to be a city");
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                setEmoji(convertToEmoji(data.countryCode) || "");
            } catch (error) {
                setGeocodingError(error.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }

        fetchCityData();
    }, [lat, lng]);

    if (isLoadingGeocoding) return <Spinner/>
    if (geocodingError) return <Message message={geocodingError}/>
    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                {/* Use button component */}
                <Button type="primary">Add</Button>
                {/*<Button type="back" onClick={(event) => {*/}
                {/*    event.preventDefault();*/}
                {/*    navigate(-1);*/}
                {/*}}>*/}
                {/*    &larr; Back*/}
                {/*</Button>*/}
                {/* Use Back button component */}
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
