import "./NotFound.css";
import {useEffect} from "react";

function NotFound() {

    useEffect(() => {
        document.title = "404 Not Found";
    }, []);

    return (
        <>
            <h1>404.</h1>
            <h2>Page not found</h2>
            <p>The requested URL <b>{window.location.pathname}</b> was not found on this server.</p>
        </>
    )
        ;
}

export default NotFound;