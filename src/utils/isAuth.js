// Проверка авторизации
import axios from "axios";
import { setAuthAction } from "../redux/auth-reducer.js";

export function isAuth(pathname) {
    return async function (dispatch) {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                await axios.get(process.env.REACT_APP_URL_BASE + pathname);

                dispatch(setAuthAction(true));
            }
        } catch (error) {
            dispatch(setAuthAction(false));
        }
    };
}
