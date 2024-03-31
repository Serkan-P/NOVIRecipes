import "./SignIn.css";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);

    useEffect(() => {
        document.title = "Sign In";
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("https://api.datavortex.nl/novirecipes/users/authenticate", {
                "username": "teste",
                "password": "12345678"
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": import.meta.env.VITE_NOVI_API_KEY,
                },
            });
            // console.log(response.data.jwt);
            login(response.data.jwt);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
                <p>*input fields*</p>
                <button type="submit">Sign in</button>
            </form>
        </>
    );
}

export default SignIn;