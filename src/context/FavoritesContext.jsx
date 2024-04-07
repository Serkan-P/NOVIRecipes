import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";
import isTokenValid from "../helpers/isTokenValid.js";

export const FavoritesContext = createContext({});

function FavoritesContextProvider({children}) {
    const {user} = useContext(AuthContext);
    const [favorites, setFavorites] = useState({
        fav: [],
        status: "pending",
    });

    const source = axios.CancelToken.source();

    const token = localStorage.getItem("tokenNOVI");
    useEffect(() => {

        if (token && isTokenValid(token)) {
            void fetchFavorites();
        } else {
            setFavorites({
                fav: [],
                status: "done",
            });
        }
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function fetchFavorites() {
        try {
            const response = await axios.get(`https://api.datavortex.nl/novirecipes/users/${user.username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cancelToken: source.token,
            });
            // console.log(response.data.info);
            const retrievedArray = JSON.parse(response.data.info);
            // console.log(retrievedArray);
            setFavorites({
                fav: retrievedArray,
                status: "done",
            });
            // console.log(favorites.fav);
        } catch (e) {
            console.error(e);
            setFavorites({
                fav: [],
                status: "done",
            });
        }
    }

    async function updateFavStatus(favToUpdate) {
        // console.log(`Link: ${favToUpdate}`);
        // console.log(favorites.fav);

        if (favorites.fav.includes(favToUpdate)) {
            // console.log("In here");
            favorites.fav.splice(favorites.fav.indexOf(favToUpdate, 1));
        } else {
            // console.log("Not here");
            favorites.fav.push(favToUpdate);
            // console.log(favorites.fav);
        }

        const uriString = JSON.stringify(favorites.fav);
        // console.log(uriString);

        try {
            const response = await axios.put(`https://api.datavortex.nl/novirecipes/users/${user.username}`, {
                "info": uriString,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log(response);
            await fetchFavorites();
        } catch (e) {
            console.error(e);
        }
    }

    function clearFavContext() {
        setFavorites({
            fav: [],
            status: "done",
        });
    }

    const contextData = {
        ...favorites,
        fetchFavorites,
        updateFavStatus,
        clearFavContext,
    };

    return (
        <FavoritesContext.Provider value={contextData}>
            {favorites.status === "done" ? children : <p>Loading...</p>}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;