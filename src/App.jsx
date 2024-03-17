import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define app routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="app" element={<AppLayout/>}>
                    {/* Nested routes inside app path*/}
                    <Route index element={<p>Default child route</p>}/>
                    <Route path="cities" element={<p>List of Cities</p>}/>
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