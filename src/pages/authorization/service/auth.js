import axios from "axios";
import { getData } from "../../../utils/getData.js";
import { setErrorTrueAction } from "../../../redux/error-reducer.js";
import { setOrgsAction } from "../../../redux/orgs-reducer.js";
import { setAuthAction } from "../../../redux/auth-reducer.js";
import { setAuthErrorAction } from "../../../redux/authError-reducer.js";

export function auth(event, email, pass, setLoader) {
    return async function (dispatch) {
        dispatch(setAuthErrorAction(false, ""));
        setLoader();
        event.preventDefault();

        const user = new FormData();
        user.set("email", "");
        user.set("pass", "");

        if (email && pass !== undefined) {
            user.set("email", email.trim());
            user.set("pass", pass.trim());
        }

        // проверка на ввод
        for (const [name, value] of user) {
            if (value.trim().length === 0) {
                dispatch(setAuthErrorAction(true, "Введите пароль и логин"));
                return;
            }
        }

        try {
            const AuthData = await axios.post(
                "http://localhost:5600/login",
                user
            );
            setLoader();
            if (AuthData.data.auth) {
                dispatch(setAuthAction(true));

                localStorage.setItem("token", AuthData.data.token);
                localStorage.setItem("email", email);
                localStorage.setItem("UserId", AuthData.data.id);

                const UserId = localStorage.getItem("UserId");
                const ORGS = await getData(`/private/?UserId=${UserId}`, () =>
                    dispatch(setAuthAction(false))
                );
                dispatch(setOrgsAction(ORGS));
            } else {
                dispatch(setAuthErrorAction(true, AuthData.data.message));
                return false;
            }
        } catch (error) {
            setLoader();
            dispatch(setErrorTrueAction(true, error.message));
        }
    };
}

// "https://deploy-test-business-assist.herokuapp.com/login",
