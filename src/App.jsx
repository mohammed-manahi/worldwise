import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";

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
                    {/* Pass the cities state to the city list component */}
                    <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="countries" element={<p>Countries</p>}/>
                    <Route path="form" element={<p>Form</p>}/>
                </Route>
                <Route path="login" element={<Login/>}/>
                {/* Handle unmatched routes */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}