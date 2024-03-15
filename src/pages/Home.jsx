import PageNav from "../components/PageNav.jsx";
import {Link} from "react-router-dom";
import AppNav from "../components/AppNav.jsx";


export default function Home() {
    return (
        <>
            <PageNav/>
            <AppNav/>
            <h1 className="test">Home page</h1>
            <Link to="/app">Go to the App</Link>
        </>
    );
}
