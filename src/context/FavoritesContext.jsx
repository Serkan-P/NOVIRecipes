import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";
import isTokenValid from "../helpers/isTokenValid.js";

export const FavoritesContext = createContext({});

function FavoritesContextProvider({children}) {
    const {user} = useContext(AuthContext);
    const [favorites, setFavorites] = useState({
        favURI: [],
        favRecipe: [],
        status: "pending",
    });

    const source = axios.CancelToken.source();

    const token = localStorage.getItem("tokenNOVI");
    useEffect(() => {

        if (token && isTokenValid(token)) {
            void fetchFavorites();
        } else {
            setFavorites({
                favURI: [],
                favRecipe: [],
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
            console.log(response.data.info);
            const retrievedArray = JSON.parse(response.data.info);
            console.log(retrievedArray);


            setFavorites({
                ...favorites,
                favURI: retrievedArray,
                status: "done",
            });

            retrievedArray.map(uri => {
                console.log("test1");
                (async () => {
                    console.log("test2");
                    try {
                        console.log("test3");
                        const response = await axios.get(`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(uri)}&app_id=${import.meta.env.VITE_EDAMAM_APP_ID}&app_key=${import.meta.env.VITE_EDAMAM_API_KEY}`);
                        console.log(response.data.hits);

                        setFavorites(prevState => ({
                            ...prevState,
                            favRecipe: [...prevState.favRecipe, ...response.data.hits],
                        }));
                    } catch (e) {
                        console.log("test4");
                        console.error(e);
                    }
                    console.log(favorites.favRecipe);
                    console.log("test5");
                })();
            });

            // console.log(favorites.favURI);
        } catch (e) {
            console.error(e);
            setFavorites({
                favURI: [],
                favRecipe: [],
                status: "done",
            });
        }
    }

    async function updateFavStatus(favToUpdate) {
        try {
            let updatedFavURI = [...favorites.favURI];

            if (updatedFavURI.includes(favToUpdate)) {
                updatedFavURI = updatedFavURI.filter(uri => uri !== favToUpdate);
            } else {
                updatedFavURI.push(favToUpdate);
            }

            const uriArrayToString = JSON.stringify(updatedFavURI);
            console.log(uriArrayToString);

            const response = await axios.put(`https://api.datavortex.nl/novirecipes/users/${user.username}`, {
                "info": uriArrayToString,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log(response);

            const updatedFavRecipePromises = updatedFavURI.map(async uri => {
                try {
                    const recipeResponse = await axios.get(`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(uri)}&app_id=${import.meta.env.VITE_EDAMAM_APP_ID}&app_key=${import.meta.env.VITE_EDAMAM_API_KEY}`);
                    return recipeResponse.data.hits;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });
            console.log(updatedFavRecipePromises);

            const updatedFavRecipeResults = await Promise.all(updatedFavRecipePromises);
            const updatedFavRecipe = updatedFavRecipeResults.filter(recipe => recipe !== null).flat();

            setFavorites({
                ...favorites,
                favURI: updatedFavURI,
                favRecipe: updatedFavRecipe,
            });

        } catch (error) {
            console.error(error);
        }
    }

    function clearFavContext() {
        setFavorites({
            favURI: [],
            favRecipe: [],
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