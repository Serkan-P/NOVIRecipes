import "./SearchRecipe.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import badge from "/src/assets/Edamam_Badge_Light.svg";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import {cuisineTypeArray, mealTypeArray, dishTypeArray} from "/src/constants/edamamQueryOptions.js";

function SearchRecipe() {
    const [recipes, setRecipes] = useState([]);
    const [cuisineType, setCuisineType] = useState("");
    const [mealType, setMealType] = useState("");
    const [dishType, setDishType] = useState("");

    const [error, toggleError] = useState("");
    const [loading, toggleLoading] = useState(false);

    const source = axios.CancelToken.source();

    const {fav, updateFavStatus} = useContext(FavoritesContext);

    useEffect(() => {
        document.title = "SearchRecipe";
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError("");
        if (!cuisineType && !mealType && !dishType) {
            toggleError("Choose at least one option");
            setRecipes("");
            return;
        }
        toggleLoading(true);
        let query = "";
        if (cuisineType && cuisineType !== "--") {
            query += "&cuisineType=" + cuisineType;
        }
        if (mealType && mealType !== "--") {
            query += "&mealType=" + mealType;
        }
        if (dishType && dishType !== "--") {
            query += "&dishType=" + dishType;
        }
        // console.log(query);

        try {
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${import.meta.env.VITE_EDAMAM_APP_ID}&app_key=${import.meta.env.VITE_EDAMAM_API_KEY}${query}`);
            // console.log(response.data.hits);
            if (response.data.hits.length <= 0) {
                toggleError("No results found");
                setRecipes({});
            } else {
                setRecipes(response.data.hits);
            }
        } catch (e) {
            console.error(e.response.data);
            toggleError(e.response.data);
        }
        toggleLoading(false);
    }

    function handleFavStatus(e) {
        updateFavStatus(e);
    }

    return (
        <>
            <h1>Search recipe</h1>
            <img
                className="edamamBadge"
                src={badge}
                alt="edamamIcon"
            />
            <form onSubmit={handleSubmit}>
                <label htmlFor="cuisine-field">
                    Cuisine type:
                </label>
                <br/>
                <select id="cuisine-field" name="cuisine-type" size="6" defaultValue=""
                        onChange={(e) => setCuisineType(e.target.value)}>
                    <option value="">--</option>
                    {cuisineTypeArray.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <br/>
                <label htmlFor="meal-field">
                    Meal type:
                </label>
                <br/>
                <select id="meal-field" name="meal-type" size="6" defaultValue=""
                        onChange={(e) => setMealType(e.target.value)}>
                    <option value="" defaultValue>--</option>
                    {mealTypeArray.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <br/>
                <label htmlFor="dish-field">
                    Dish type:
                </label>
                <br/>
                <select id="dish-field" name="dish-type" size="6" defaultValue=""
                        onChange={(e) => setDishType(e.target.value)}>
                    <option value="" defaultValue>--</option>
                    {dishTypeArray.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <br/>
                {error && <p className="error">{error} </p>}
                <br/>
                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Search
                </button>
            </form>
            <br/>
            {!loading ?
                <ul>
                    {recipes.length > 0 &&
                        recipes.map((recipe) => {
                            const data = recipe.recipe;
                            return <li key={data.uri}>
                                <p>
                                    <img
                                        className="recipe-image"
                                        src={data.image}
                                        alt={data.label + " image"}/>
                                    <br/>
                                    {data.label}
                                    <br/>
                                    <button
                                        onClick={() => handleFavStatus(data.uri)}>{fav.includes(data.uri) ? "Remove from favorites" : "Add to favorites"}</button>
                                    <br/>
                                    <a href={data.url}>Link to recipe.</a>
                                </p>
                            </li>
                        })
                    }
                </ul>
                : <p>Loading...</p>
            }


        </>
    );
}

export default SearchRecipe;