// Проверка авторизации
import axios from "axios";

export async function isAuth(url, token, dispatchTrue, dispatchFalse) {
    if (token) {
        const result = await axios.get(url);
        if (result.data.auth) return dispatchTrue();
    }
    const keys = Object.keys(localStorage);
    for (const key of keys) {
        localStorage.removeItem(key);
    }
    return dispatchFalse();
}
