import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import SignIn from "./pages/signin/SignIn.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Search from "./pages/search/Search.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App
