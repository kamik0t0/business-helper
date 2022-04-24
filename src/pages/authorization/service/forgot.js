import axios from "axios";
import { setErrorTrueAction } from "../../../redux/error-reducer.js";
import { setAuthErrorAction } from "../../../redux/authError-reducer.js";
import { validatePass } from "../../../utils/validatePass.js";

export function forgot(
    event,
    email,
    repeatPass,
    newPass,
    setLoader,
    setIsRecover
) {
    return async function (dispatch) {
        dispatch(setAuthErrorAction(false, ""));
        setLoader();
        event.preventDefault();
        const user = new FormData();

        user.set("email", "");
        user.set("pass", "");

        if (email && repeatPass && newPass !== undefined) {
            user.set("email", email.trim());
            user.set("pass", repeatPass.trim());
            user.set("pass", newPass.trim());

            if (newPass.localeCompare(repeatPass) !== 0) {
                dispatch(setAuthErrorAction(true, "Пароли не совпадают!"));
                return;
            }

            if (!validatePass(newPass.trim())) {
                dispatch(
                    setAuthErrorAction(
                        true,
                        "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать  -, (, ),  , /"
                    )
                );
                return;
            }
        }

        for (const [name, value] of user) {
            if (value.trim().length === 0) {
                dispatch(setAuthErrorAction(true, "Введите что-нибудь..."));
                return;
            }
        }
        try {
            const response = await axios.post(
                "http://localhost:5600/login/forgot/",
                user
            );
            setLoader();
            if (response.data.updated) {
                // ... статус в локальном стейте меняется на зарегистрированный и перенаправляется на страницу авторизации
                setIsRecover();
            } else {
                dispatch(setAuthErrorAction(true, response.data.message));
            }
        } catch (error) {
            console.log(error);
            setLoader();
            dispatch(setErrorTrueAction(true, error.message));
        }
    };
}

// "https://deploy-test-business-assist.herokuapp.com/login/forgot",
