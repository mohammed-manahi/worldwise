import {createContext, useContext, useEffect, useState} from "react";

// Step 1: create the context
const CitiesContext = createContext();

// Define API url
const apiUrl = `http://localhost:9900`;

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}) {

    // Define a state to manage cities
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get city data using another http request and place in the context because it is needed in multiple components
    // If the current city is needed in one component only, it should be placed in the city component
    const [currentCity, setCurrentCity] = useState({});

    // Define and effect to fetch data
    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/cities`);
                const data = await response.json();
                setCities(data);
            } catch {
                alert("There was an error while fetching the data!")
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        // Fetch current city data
        try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
        } catch {
            alert("There was an error while fetching the data!")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        // Step 2: use the context to wrap needed jsx content
        <CitiesContext.Provider value={{cities: cities, isLoading: isLoading, currentCity: currentCity, getCity: getCity}}>
            {children}
        </CitiesContext.Provider>
    );

}

function useCities() {
    // Step 3: create a custom hook to consume the context
    const Consumer = useContext(CitiesContext)
    if (Consumer === undefined) {
        throw new Error("Consumer of cities context is undefined because it was invoked outside the context provider");
    }
    return Consumer;
}

export {CitiesProvider, useCities}