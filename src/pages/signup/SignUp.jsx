import "./SignUp.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, toggleError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    const source = axios.CancelToken.source();

    useEffect(() => {
        document.title = "Sign Up";
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError("");
        toggleLoading(true);

        try {
            const response = await axios.post("https://api.datavortex.nl/novirecipes/users", {
                "username": username,
                "email": email,
                "password": password,
            }, {
                cancelToken: source.token,
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": import.meta.env.VITE_NOVI_API_KEY,
                },
            });
            console.log(response);
            navigate("/signin");
        } catch (e) {
            console.error(e.response.data);
            toggleError(e.response.data);
        }
        toggleLoading(false);
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-field">
                    Email:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br/>
                <label htmlFor="username-field">
                    Username:
                    <input
                        type="text"
                        id="username-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br/>
                <label htmlFor="password-field">
                    Password:
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
                    disabled={loading}
                >
                    Sign up
                </button>
            </form>
            <p>Already have a account? Sign in <Link to="/signin">here</Link>.</p>
        </>
    );
}

export default SignUp;