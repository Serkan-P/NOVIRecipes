import "./SignIn.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, toggleError] = useState("");
    const {login} = useContext(AuthContext);

    const source = axios.CancelToken.source();

    useEffect(() => {
        document.title = "Sign In";
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError("");

        try {
            const response = await axios.post("https://api.datavortex.nl/novirecipes/users/authenticate", {
                "username": username,
                "password": password,
            }, {
                cancelToken: source.token,
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": import.meta.env.VITE_NOVI_API_KEY,
                },
            });
            // console.log(response.data.jwt);
            login(response.data.jwt);
        } catch (e) {
            console.error(e.response.data)
            toggleError(e.response.data);
        }
    }

    return (
        <>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username-field">
                    Username:
                    <input
                        type="text"
                        id="username-field"
                        name="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br/>
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br/>
                {error && <p className="error">{error}</p>}
                <button
                    type="submit"
                    className="form-button"
                >
                    Sign in
                </button>
            </form>
        </>
    );
}

export default SignIn;