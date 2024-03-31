import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";
import isTokenValid from "../helpers/isTokenValid.js";

export const FavoritesContext = createContext({});

function FavoritesContextProvider({children}) {
    const {user} = useContext(AuthContext);
    const [favorites, setFavorites] = useState({
        fav: null,
        status: "pending",
    });

    const source = axios.CancelToken.source();

    const token = localStorage.getItem("tokenNOVI");
    useEffect(() => {

        if (token && isTokenValid(token)) {
            void fetchFavorites();
        } else {
            setFavorites({
                fav: null,
                status: "done",
            });
        }
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function fetchFavorites() {
        const username = user.username;

        try {
            const response = await axios.get(`https://api.datavortex.nl/novirecipes/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cancelToken: source.token,
            });
            setFavorites({
                fav: response.data.info,
                status: "done",
            });
        } catch (e) {
            console.error(e);
            setFavorites({
                fav: null,
                status: "done",
            });
        }
    }

    const contextData = {
        ...favorites,
        fetchFavorites,
    };

    return (
        <FavoritesContext.Provider value={contextData}>
            {favorites.status === "done" ? children : <p>Loading...</p>}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;