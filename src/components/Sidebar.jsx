import styles from "./Sidebar.module.css"
import AppNav from "./AppNav.jsx";
import Logo from "./Logo.jsx";
import {Outlet} from "react-router-dom";
export default function Sidebar(){
    return(
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>

            {/* Invoke nested child routes */}
            <Outlet/>

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} WorldWise.</p>
            </footer>
        </div>
    );
}