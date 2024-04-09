import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import logo from "/src/assets/HeaderLogo.png"
import {FavoritesContext} from "../context/FavoritesContext.jsx";

function NavBar() {
    const {isAuth, user, logout} = useContext(AuthContext);
    const {clearFavContext} = useContext(FavoritesContext);

    const navigate = useNavigate();

    function signOut() {
        clearFavContext();
        logout();
    }

    return (
        <nav className="header">
            <NavLink to="/">
                <span className="logoContainer">
                    <img src={logo} alt="logo" className="logoImage"/>
                    <span className="logoName">
                      NOVI Recipes
                    </span>
                </span>
            </NavLink>

            <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                     to="/">Home</NavLink>

            {isAuth && <>
                <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                         to="/searchrecipe">Search recipe</NavLink>
                <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                         to="/profile">Profile</NavLink>
                <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                         to="/settings">Settings</NavLink>
            </>
            }
            {isAuth ?
                <div className="navUser">
                    <span>Welcome {user.username} </span>
                    <button type="button" onClick={signOut}>Sign out</button>
                </div>
                :
                <div>
                    <button type="button" onClick={() => navigate('/signin')}>Sign in</button>
                    <button type="button" onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            }
        </nav>
    );
}

export default NavBar;