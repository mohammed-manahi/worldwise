import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function ProtectedRoute({children}) {
    // Protect application route from unauthenticated users
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? children : "";
}

export default ProtectedRoute;