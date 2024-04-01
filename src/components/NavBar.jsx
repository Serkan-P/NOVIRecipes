import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import logo from "../../public/vite.svg"

function NavBar() {
    const {isAuth, user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <NavLink to="/">
                <span className="logo-container">
                    <img src={logo} alt="logo"/>
                    <h3>
                      NOVI Recipes
                    </h3>
                </span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/">Home</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/searchrecipe">Search recipe</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/profile">Profile</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/settings">Settings</NavLink>

            {isAuth ?
                <div className="navUser">
                    <span>Welcome {user.username} </span>
                    <button type="button" onClick={logout}>Sign out</button>
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