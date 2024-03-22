import {createContext, useCallback, useContext, useEffect, useReducer, useState} from "react";
import city from "../components/City.jsx";

// Step 1: create the context
const CitiesContext = createContext();

// Define API url
const apiUrl = `http://localhost:9900`;


const initialState = {
    // Define the initial state
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
}

function reducer(state, action) {
    // Define the reducer function
    switch (action.type) {
        case "loading":
            return {...state, isLoading: true};
        case "cities/loaded":
            return {...state, isLoading: false, cities: action.payload};
        case "city/loaded":
            return {...state, isLoading: false, currentCity: action.payload};
        case "city/created":
            return {...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload};
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {}
            };
        case "rejected":
            return {...state, isLoading: false, error: action.payload};
        default:
            throw new Error("Unknown action type");

    }

}

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}) {

    // // Define a state to manage cities
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    //
    // // Get city data using another http request and place in the context because it is needed in multiple components
    // // If the current city is needed in one component only, it should be placed in the city component
    // const [currentCity, setCurrentCity] = useState({});

    // Re-write the states using the useReducer hook
    const [state, dispatch] = useReducer(reducer, initialState);

    // Define and effect to fetch data
    useEffect(() => {
        async function fetchCities() {
            // Loading action type
            dispatch({type: "loading"})
            try {
                // setIsLoading(true);
                const response = await fetch(`${apiUrl}/cities`);
                const data = await response.json();
                // setCities(data);
                // Cities loaded action type
                dispatch({type: "cities/loaded", payload: data})
            } catch {
                // alert("There was an error while fetching the data!");
                dispatch({type: "rejected", payload: "There was an error while fetching the cities data!"});
            }
            // } finally {
            //     setIsLoading(false);
            // }
        }

        fetchCities();
    }, []);

    // Apply memoization to get city to avoid infinite loop in the use effect hook in the city component
   const getCity = useCallback(async function getCity(id) {
        // Fetch current city data if the id is different
        // The id is coming from the url params so it need to be converted to a number
        if(Number(id) === state.currentCity.id) return;
        // Loading action type
        dispatch({type: "loading"})
        try {
            //setIsLoading(true);
            const response = await fetch(`${apiUrl}/cities/${id}`);
            const data = await response.json();
            //setCurrentCity(data);
            //
            dispatch({type: "city/loaded", payload: data});
        } catch {
            // alert("There was an error while fetching the data!")
            dispatch({type: "rejected", payload: "There was an error while fetching the city data!"});
        }
        // finally {
        //     setIsLoading(false);
        // }
    }, [state.currentCity.id]);

    async function createCity(newCity) {
        // Create a new city
        // Loading action type
        dispatch({type: "loading"})
        try {
            //setIsLoading(true);
            // Post the new city to the api
            const response = await fetch(`${apiUrl}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            console.log(data);
            // Add the new city to the state
            // setCities(cities => [...cities, data])

            // City created action type
            dispatch({type: "city/created", payload: data})
        } catch {
            //alert("There was an error while creating the data!")
            dispatch({type: "rejected", payload: "There was an error while creating the city data!"});
        }
        // finally {
        //     setIsLoading(false);
        // }
    }

    async function deleteCity(id) {
        // Delete a city

        // Loading action type
        dispatch({type: "loading"})

        try {
            //setIsLoading(true);
            // Post the new city to the api
            await fetch(`${apiUrl}/cities/${id}`, {
                method: "DELETE",
            });
            //setCities((cities) => cities.filter((city) => city.id !== id))

            // City deleted action type
            dispatch({type: "city/deleted", payload: id})
        } catch {
            // alert("There was an error while deleting the data!")
            dispatch({type: "rejected", payload: "There was an error while deleting the city data!"});
        }
        // finally {
        //     setIsLoading(false);
        // }
    }

    return (
        // Step 2: use the context to wrap needed jsx content
        <CitiesContext.Provider
            value={{
                cities: state.cities,
                isLoading: state.isLoading,
                currentCity: state.currentCity,
                getCity: getCity,
                createCity: createCity,
                deleteCity: deleteCity,
                error: state.error
            }}>
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