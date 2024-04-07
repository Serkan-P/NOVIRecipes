import "./Profile.css";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";

function Profile() {
    const {user} = useContext(AuthContext);
    const {fav, fetchFavorites} = useContext(FavoritesContext);

    useEffect(() => {
        document.title = "Profile";
        fetchFavorites();
    }, []);

    return (
        <>
            <h1>Profile</h1>
            <section>
                <h2>User info</h2>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Favorites:</strong></p>
                {fav.length > 0 ?
                    <ul>
                        {fav.map((recipe) => {
                            return <li key={recipe}>{recipe}</li>
                        })}
                    </ul> :
                    <p>No recipe added</p>
                }
            </section>

            <p>Back to <Link to="/">homepage</Link></p>
        </>
    );
}

export default Profile;