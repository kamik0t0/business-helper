import axios from "axios";
import { validatePass } from "../../../utils/validatePass.js";
import { setAuthErrorAction } from "../../../redux/authError-reducer.js";
import { setErrorTrueAction } from "../../../redux/error-reducer.js";

export function addUser(event, email, pass, setIsReg, setLoader) {
    return async function (dispatch) {
        setLoader(true);
        dispatch(setAuthErrorAction(false, ""));
        event.preventDefault();

        const user = new FormData();

        user.set("email", "");
        user.set("pass", "");

        if (email && pass !== undefined) {
            user.set("email", email.trim());
            user.set("pass", pass.trim());

            if (!validatePass(pass.trim())) {
                dispatch(
                    setAuthErrorAction(
                        true,
                        "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать: пробел  - ( )  /"
                    )
                );
                return;
            }
        }

        // проверка на ввод
        for (const [name, value] of user) {
            if (value.trim().length === 0) {
                dispatch(setAuthErrorAction(true, "Введите пароль и логин"));
                return;
            }
        }

        try {
            const RegData = await axios.post(
                "http://localhost:5600/login/registration",
                user
            );
            console.log(RegData.data);

            if (RegData.data.registered) {
                setLoader(false);
                console.log(RegData.data.registered);
                setIsReg();
            } else {
                setLoader(false);
                dispatch(setAuthErrorAction(true, RegData.data.regerror));
            }
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            setLoader(false);
        }
    };
}

// "https://deploy-test-business-assist.herokuapp.com/login/registration",
