import "./Profile.css";
import {useEffect} from "react";

function Profile() {

    useEffect(() => {
        document.title = "Profile";
    }, []);

    return (
        <>
            <h1>Profile</h1>
        </>
    );
}

export default Profile;