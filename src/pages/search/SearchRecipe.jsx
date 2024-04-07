import "./SearchRecipe.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import badge from "/src/assets/Edamam_Badge_Light.svg";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";


function SearchRecipe() {
    const [recipes, setRecipes] = useState([]);
    const [cuisineType, setCuisineType] = useState("");
    const [mealType, setMealType] = useState("");
    const [dishType, setDishType] = useState("");

    const [error, toggleError] = useState("");
    const [loading, toggleLoading] = useState(false);

    const source = axios.CancelToken.source();

    // const {addToFavorites} = useContext(FavoritesContext);

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
        console.log(query);

        try {
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${import.meta.env.VITE_EDAMAM_APP_ID}&app_key=${import.meta.env.VITE_EDAMAM_API_KEY}${query}`);
            console.log(response.data.hits);
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

    // void function handleAddToFav(e) {
    //     e.preventDefault();
    //     addToFavorites(e);
    // }

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
                    <option value="American">American</option>
                    <option value="Asian">Asian</option>
                    <option value="British">British</option>
                    <option value="Caribbean">Caribbean</option>
                    <option value="Central Europe">Central Europe</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Eastern Europe">Eastern Europe</option>
                    <option value="French">French</option>
                    <option value="Indian">Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Kosher">Kosher</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                    <option value="Nordic">Nordic</option>
                    <option value="South American">South American</option>
                    <option value="South East Asian">South East Asian</option>
                </select>
                <br/>
                <label htmlFor="meal-field">
                    Meal type:
                </label>
                <br/>
                <select id="meal-field" name="meal-type" size="6" defaultValue=""
                        onChange={(e) => setMealType(e.target.value)}>
                    <option value="" defaultValue>--</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snack">Snack</option>
                    <option value="Teatime">Teatime</option>
                </select>
                <br/>
                <label htmlFor="dish-field">
                    Dish type:
                </label>
                <br/>
                <select id="dish-field" name="dish-type" size="6" defaultValue=""
                        onChange={(e) => setDishType(e.target.value)}>
                    <option value="" defaultValue>--</option>
                    <option value="Biscuits and cookies">Biscuits and cookies</option>
                    <option value="Bread">Bread</option>
                    <option value="Cereals">Cereals</option>
                    <option value="Condiments and sauces">Condiments and sauces</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Main course">Main course</option>
                    <option value="Pancake">Pancake</option>
                    <option value="Preps">Preps</option>
                    <option value="Preserve">Preserve</option>
                    <option value="Salad">Salad</option>
                    <option value="Sandwiches">Sandwiches</option>
                    <option value="Side dish">Side dish</option>
                    <option value="Soup">Soup</option>
                    <option value="Starter">Starter</option>
                    <option value="Sweets">Sweets</option>
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
                                    {/*<br/>*/}
                                    {/*<button onClick={handleAddToFav(recipe._links.self.href)}>Add to Favorites</button>*/}
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