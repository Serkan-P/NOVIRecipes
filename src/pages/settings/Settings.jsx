import "./Settings.css";
import {useEffect} from "react";

function Settings() {

    useEffect(() => {
        document.title = "Settings";
    }, []);

    return (
        <>
            <h1>Settings</h1>
        </>
    );
}

export default Settings;