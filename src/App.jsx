import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

// Define API url
const apiUrl = `http://localhost:9900`;

export default function App() {
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
        <BrowserRouter>
            <Routes>
                {/* Define app routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="app" element={<AppLayout/>}>
                    {/* Nested routes inside app path with default city list nested route*/}
                    {/* Navigate component to redirect to the cities path and replace current element in browser history stack */}
                    <Route index element={<Navigate replace to="cities" />}/>\
                    {/* Pass the cities state to the city list component */}
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    {/* Dynamic URL route state using city id */}
                    <Route path="cities/:id" element={<City/>}/>
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
                    {/* Programmatic navigation */}
                    <Route path="form" element={<Form/>}/>
                </Route>
                <Route path="login" element={<Login/>}/>
                {/* Handle unmatched routes */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}