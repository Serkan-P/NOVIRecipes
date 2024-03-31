import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

function NavBar() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/">Home</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/search">Search</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/profile">Profile</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                     to="/settings">Settings</NavLink>

            {isAuth ? <button type="button" onClick={logout}>Sign out</button> :
                <div>
                    <button type="button" onClick={() => navigate('/signin')}>Sign in</button>
                    <button type="button" onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            }
        </nav>
    );
}

export default NavBar;