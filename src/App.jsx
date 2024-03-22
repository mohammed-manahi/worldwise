import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// Application pages to split (start)
// import Product from "./pages/Product.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import Home from "./pages/Home.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Login from "./pages/Login.jsx";
// Application pages to split (end)
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";



/* Stats before lazy loading:
 dist/assets/index-fab67588.css   29.89 kB │ gzip:   5.06 kB
 dist/assets/index-9939b32d.js   513.84 kB │ gzip: 148.22 kB\
*/

// Lazy loading of application pages (Home, Product, Pricing, AppLayout, Login and PageNotFound)
const Home = lazy(() => import("./pages/Home.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

export default function App() {
    return (

        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage/>}>
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
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>

    );
}