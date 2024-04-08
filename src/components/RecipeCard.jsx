function RecipeCard({ recipe, onRecipeLinkClick, onFavoriteButtonClick, isFavorite }) {
    const { label, image, url, uri } = recipe.recipe;

    return (
        <li key={uri}>
            <div className="recipeCard">
                <img
                    className="recipe-image"
                    src={image}
                    alt={label + " image"}
                />
                <br />
                <h3>{label}</h3>
                <button onClick={() => onRecipeLinkClick(url)}>Visit Recipe</button>
                <button onClick={() => onFavoriteButtonClick(uri)}>
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        </li>
    );
}

export default RecipeCard;