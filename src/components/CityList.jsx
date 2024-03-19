import styles from "./CityList.module.css"
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

// eslint-disable-next-line react/prop-types
export default function CityList() {
    const {cities, isLoading} = useCities();
    if (isLoading) return <Spinner/>;
    // eslint-disable-next-line react/prop-types
    // Handle no city list data
    if(!cities.length) return <Message message="Add your first city by clicking on a city in the map"/>
    return (
        <ul className={styles.cityList}>
            {/* eslint-disable-next-line react/prop-types */}
            {cities.map(city => <CityItem city={city} key={city.id}/>)}
        </ul>
    );
}