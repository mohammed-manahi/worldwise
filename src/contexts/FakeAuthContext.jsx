import {createContext, useContext, useReducer} from "react";

// Define auth context
const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};


function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {...state, user: action.payload, isAuthenticated: true};
        case "logout":
            return {...state, user: null, isAuthenticated: false};
        default:
            throw new Error("Unknown action type");
    }
}

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Fake login function
    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: "login", payload: FAKE_USER});
        }
    }

    // Fake logout function
    function logout() {
        dispatch({type: "logout"});
    }

    return (
        // Define the auth context provider
        <AuthContext.Provider value={{
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            login: login,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    // Consume the auth context
    const Consumer = useContext(AuthContext);
    if (Consumer === undefined) {
        throw new Error("Consumer of auth context is undefined because it was invoked outside the context provider");
    }
    return Consumer;
}

export {AuthProvider, useAuth};