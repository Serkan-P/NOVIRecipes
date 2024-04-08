import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const source = axios.CancelToken.source();

    useEffect(() => {
        const token = localStorage.getItem("tokenNOVI");

        if (token && isTokenValid(token)) {
            console.log("Token still valid!");
            void login(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
        return function cleanup() {
            source.cancel();
        }
    }, [])
    const navigate = useNavigate();

    async function login(token, redirectUrl) {
        localStorage.setItem("tokenNOVI", token);
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;

        try {
            const response = await axios.get(`https://api.datavortex.nl/novirecipes/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                },
                status: "done",
            });
        } catch (e) {
            console.error(e);
            logout();
        }
        console.log("User is signed in!");
        if (redirectUrl) {
            navigate(redirectUrl);
        }
    }

    function logout() {
        console.log("User is signed out!");
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        navigate("/");
    }

    const contextData = {
        ...isAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;