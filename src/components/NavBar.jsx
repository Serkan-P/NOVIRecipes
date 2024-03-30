import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/">Home</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/signup">Sign Up</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/signin">Sign In</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/profile">Profile</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/settings">Settings</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/search">Search</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;