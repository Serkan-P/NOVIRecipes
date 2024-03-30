import "./SignUp.css";
import {useEffect} from "react";

function SignUp() {

    useEffect(() => {
        document.title = "Sign Up";
    }, []);

    return (
        <>
            <h1>Sign Up</h1>
        </>
    );
}

export default SignUp;