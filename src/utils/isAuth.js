// Проверка авторизации
import axios from "axios";
import { setAuthAction } from "../redux/auth-reducer.js";
// import { useLocation } from "react-router-dom";

export function isAuth(pathname) {
    // const { pathname } = useLocation();
    return async function (dispatch) {
        const token = localStorage.getItem("token");
        console.log(token);
        try {
            if (token) {
                console.log(token);
                await axios.get(process.env.REACT_APP_URL_BASE + pathname);

                dispatch(setAuthAction(true));
            }
        } catch (error) {
            dispatch(setAuthAction(false));
        }
    };
}
