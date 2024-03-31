import {jwtDecode} from "jwt-decode";

function isTokenValid(token) {
    const decodedToken = jwtDecode(token);

    const expirationTime = decodedToken.exp;
    const currentTime = new Date().getTime();
    const convertedCurrentTime = Math.round(currentTime / 1000);

    return expirationTime - convertedCurrentTime > 0;
}

export default isTokenValid;