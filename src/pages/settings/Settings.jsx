import "./Settings.css";
import {useEffect} from "react";

function Settings() {

    useEffect(() => {
        document.title = "Settings";
    }, []);

    return (
        <>
            <h1>Settings</h1>
            <p>In progress, soon here you will be able to change your user information such as username and password.</p>
        </>
    );
}

export default Settings;