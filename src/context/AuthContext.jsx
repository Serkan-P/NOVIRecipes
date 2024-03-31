import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    useEffect(() => {
        const token = localStorage.getItem("tokenNOVI");

        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }

    }, [])
    const navigate = useNavigate();

    async function login(token) {
        localStorage.setItem("tokenNOVI", token);
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken.sub);

        try {
            const response = await axios.get(`https://api.datavortex.nl/novirecipes/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            // console.log(response);

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    // id: response.data.id,
                },
                status: "done",
            });
        } catch (e) {
            console.error(e);
            logout();
        }
        console.log("User is signed in!");
        // const path = window.location.pathname;
        // if (path === "/" || path === "/signin") {
        //     console.log("what is this?");
        // } else {
        //     navigate("/profile");
        // }
        navigate("/profile");
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
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;