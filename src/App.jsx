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
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";


export default function App() {
    return (

        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Define app routes */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="product" element={<Product/>}/>
                        <Route path="pricing" element={<Pricing/>}/>
                        {/* Wrap the protected route for app layout*/}
                        <Route path="app" element={
                            <ProtectedRoute>
                                <AppLayout/>
                            </ProtectedRoute>}>
                            {/* Nested routes inside app path with default city list nested route*/}
                            {/* Navigate component to redirect to the cities path and replace current element in browser history stack */}
                            <Route index element={<Navigate replace to="cities"/>}/>
                            {/* Pass the cities state to the city list component */}
                            <Route path="cities" element={<CityList/>}/>
                            {/* Dynamic URL route state using city id */}
                            <Route path="cities/:id" element={<City/>}/>
                            <Route path="countries" element={<CountryList/>}/>
                            {/* Programmatic navigation */}
                            <Route path="form" element={<Form/>}/>
                        </Route>
                        <Route path="login" element={<Login/>}/>
                        {/* Handle unmatched routes */}
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>

    );
}