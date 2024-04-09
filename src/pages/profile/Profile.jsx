import "./Profile.css";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import RecipeCard from "../../components/RecipeCard.jsx";

function Profile() {

    const {user} = useContext(AuthContext);
    const {favURI, favRecipe, updateFavStatus} = useContext(FavoritesContext);

    useEffect(() => {
        document.title = "Profile";
    }, []);

    function handleFavStatus(e) {
        updateFavStatus(e);
    }

    function onRecipeLinkInNewTab(url) {
        window.open(url, "_blank");
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <h1>Profile</h1>
            <section>
                <h2>User info</h2>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <h2>Favorites:</h2>
                {favRecipe.length > 0 ? (
                    <ul>
                        {favRecipe.map((recipe, index) => (
                            <RecipeCard
                                key={`${recipe.recipe.uri}_${index}`}
                                recipe={recipe}
                                onRecipeLinkClick={onRecipeLinkInNewTab}
                                onFavoriteButtonClick={handleFavStatus}
                                isFavorite={favURI.includes(recipe.recipe.uri)}
                            />
                        ))}
                    </ul>
                ) : (
                    <p>No recipe added</p>
                )}
            </section>

            <button onClick={topFunction} className="BackToTop">Go to top</button>
        </>
    );
}

export default Profile;