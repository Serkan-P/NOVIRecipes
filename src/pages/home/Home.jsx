import "./Home.css";
import {useContext, useEffect, useState} from "react";
import {cuisineTypeArray, dishTypeArray, mealTypeArray} from "../../constants/edamamQueryOptions.js";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard.jsx";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import {AuthContext} from "/src/context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function Home() {
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const {favURI, updateFavStatus} = useContext(FavoritesContext);
    const [dailyRecipe, setDailyRecipe] = useState(null);

    // let dailyRecipe = null;
    let testString = "";

    useEffect(() => {
        document.title = "Home";
        generateDailyRecipe();
    }, []);

    function handleFavStatus(e) {
        if (isAuth) {
            updateFavStatus(e);
        } else {
            navigate("/signin");
        }
    }

    function onRecipeLinkInNewTab(url) {
        window.open(url, "_blank");
    }

    async function generateDailyRecipe() {
        const cuisineTypeIndex = getRandomNumberInRangeByDateSeed(0, cuisineTypeArray.length - 1, 1);
        const mealTypeIndex = getRandomNumberInRangeByDateSeed(0, mealTypeArray.length - 1, 2);
        const dishTypeIndex = getRandomNumberInRangeByDateSeed(0, dishTypeArray.length - 1, 3);

        console.log(`Cuisine type: ${cuisineTypeArray[cuisineTypeIndex]}`);
        console.log(`Meal type: ${mealTypeArray[mealTypeIndex]}`);
        console.log(`Dish type: ${dishTypeArray[dishTypeIndex]}`);

        let query = "";
        query += `&cuisineType=${cuisineTypeArray[cuisineTypeIndex]}`;
        query += `&mealType=${mealTypeArray[mealTypeIndex]}`;
        query += `&dishType=${dishTypeArray[dishTypeIndex]}`;

        try {
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${import.meta.env.VITE_EDAMAM_APP_ID}&app_key=${import.meta.env.VITE_EDAMAM_API_KEY}${query}`);
            console.log(response.data.hits);
            if (response.data.hits.length <= 0) {
                console.log("No results found");
            } else {
                setDailyRecipe((response.data.hits[0]));
            }
        } catch (e) {
            console.error(e);
        }
        console.log(dailyRecipe);
        return dailyRecipe;
    }

    function getRandomNumberInRangeByDateSeed(min, max, seedModifier) {
        // For testing custom date
        // const date = new Date(2024, 0, 1);
        const date = new Date();

        testString += `Date object day: ${date.getDate()}`;

        let seed = null;
        switch (seedModifier) {
            case 1:
                seed = (date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()) * date.getFullYear();
                break;
            case 2:
                seed = (date.getFullYear() * 20000 + (date.getMonth() + 1) * 200 + date.getDate()) * (date.getMonth() + 1);
                break;
            case 3:
                seed = (date.getFullYear() * 30000 + (date.getMonth() + 1) * 300 + date.getDate()) * date.getDate();
                break;
            default:
                seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
        }
        testString += `| Seed: ${seed}`;

        const random = (seed * 9301 + 49297) % 233280;
        testString += `| Random: ${random}`;

        const randomInRange = Math.floor(min + (random / 233280) * (max - min + 1));
        testString += `| randomInRange: ${randomInRange}`;

        console.log(testString);
        return randomInRange;
    }

    return (
        <>
            <h1>Home</h1>
            {dailyRecipe && (
                <RecipeCard
                    key={dailyRecipe.recipe.uri}
                    recipe={dailyRecipe}
                    onRecipeLinkClick={onRecipeLinkInNewTab}
                    onFavoriteButtonClick={handleFavStatus}
                    isFavorite={favURI.includes(dailyRecipe.recipe.uri)}
                />
            )}
        </>
    );
}

export default Home;