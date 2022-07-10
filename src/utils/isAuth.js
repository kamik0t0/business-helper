// Проверка авторизации
import axios from "axios";
import { setAuth } from "../redux/reducers/authSlice.js";

export function isAuth(pathname) {
    return async function (dispatch) {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                await axios.get(process.env.REACT_APP_URL_BASE + pathname);

                dispatch(setAuth(true));
            }
        } catch (error) {
            dispatch(setAuth(false));
        }
    };
}
