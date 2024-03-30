import "./SignIn.css";
import {useEffect} from "react";

function SignIn() {

    useEffect(() => {
        document.title = "Sign In";
    }, []);

    return (
        <>
            <h1>Sign In</h1>
        </>
    );
}

export default SignIn;