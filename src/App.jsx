import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import SignIn from "./pages/signin/SignIn.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Settings from "./pages/settings/Settings.jsx";
import SearchRecipe from "./pages/search/SearchRecipe.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import NavBar from "./components/NavBar.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />
                <Route path="/settings" element={isAuth ? <Settings /> : <Navigate to="/" />} />
                <Route path="/searchrecipe" element={isAuth ? <SearchRecipe /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound/>}/>


            </Routes>
        </>
    )
}

export default App
