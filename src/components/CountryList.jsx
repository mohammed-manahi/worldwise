import styles from "./CountryList.module.css"
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

// eslint-disable-next-line react/prop-types
export default function CountryList() {
    const {cities, isLoading} = useCities();
    if (isLoading) return <Spinner/>;
    // eslint-disable-next-line react/prop-types
    // Handle no city list data
    // eslint-disable-next-line react/prop-types
    if (!cities.length) return <Message message="Add your first city by clicking on a city in the map"/>

    // Extract countries from the cities passed prop
    // eslint-disable-next-line react/prop-types
    const countries = cities.reduce((arr, city) => {
                if (!arr.map((element) => element.country).includes(city.country))
                    return [...arr, {
                    country: city.country,
                    emoji: city.emoji
                }];
                else return arr
            }, []);

    return (
        <ul className={styles.countryList}>
            {/* eslint-disable-next-line react/prop-types */}
            {countries.map(country => <CountryItem country={country} key={country.id}/>)}
        </ul>
    );
}