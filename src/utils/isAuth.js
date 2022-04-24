// Проверка авторизации
import axios from "axios";
import { setAuthAction } from "../redux/auth-reducer.js";

export function isAuth(url) {
    return async function (dispatch) {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                await axios.get(url);

                dispatch(setAuthAction(true));
            }
        } catch (error) {
            dispatch(setAuthAction(false));
        }
    };
}
