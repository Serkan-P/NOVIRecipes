import "./NotFound.css";
import {useEffect} from "react";

function NotFound() {

    useEffect(() => {
        document.title = "404 Not Found";
    }, []);

    return (
        <>
            <h1>Not Found</h1>
        </>
    );
}

export default NotFound;