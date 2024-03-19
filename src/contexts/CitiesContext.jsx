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
    return (
        // Step 2: use the context to wrap needed jsx content
        <CitiesContext.Provider value={{cities: cities, isLoading: isLoading}}>
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