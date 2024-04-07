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
            console.log(response.data.info);
            let favArray = [];
            favArray = response.data.info
            setFavorites({
                fav: favArray,
                status: "done",
            });
            // console.log(favorites.fav.);
        } catch (e) {
            console.error(e);
            setFavorites({
                fav: null,
                status: "done",
            });
        }
    }

    // async function addToFavorites(favToAdd) {
    //     const newFavs = favorites + `, ${favToAdd}`;
    //     try {
    //         const response = await axios.put(`https://api.datavortex.nl/novirecipes/users/${username}`, {
    //             "info": newFavs,
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         });
    //         console.log(response);
    //         await fetchFavorites();
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    function clearFavContext() {
        setFavorites({
            fav: null,
            status: "done",
        });
    }

    const contextData = {
        ...favorites,
        fetchFavorites,
        clearFavContext,
    };

    return (
        <FavoritesContext.Provider value={contextData}>
            {favorites.status === "done" ? children : <p>Loading...</p>}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;