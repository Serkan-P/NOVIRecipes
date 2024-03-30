import "./Search.css";
import {useEffect} from "react";

function Search() {

    useEffect(() => {
        document.title = "Search";
    }, []);

    return (
        <>
            <h1>Search</h1>
        </>
    );
}

export default Search;