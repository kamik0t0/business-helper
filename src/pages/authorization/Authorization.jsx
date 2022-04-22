import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { getData } from "../../utils/getData.js";
import { setRegTrueAction } from "../../redux/auth-reducer.js";
import { setRegFalseAction } from "../../redux/auth-reducer.js";
import { setErrorTrueAction } from "../../redux/error-reducer.js";
import { setOrgsAction } from "../../redux/orgs-reducer.js";

function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const [isInvalid, setIsInvalid] = useState({
        isInvalid: false,
        result: "",
    });
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    let email = useRef();
    let pass = useRef();

    // Показать пароль
    function showPass() {
        document.forms.auth.elements.pass.setAttribute("type", "text");
        setIsVisible(!isVisible);
    }
    // Спрятать пароль
    function hidePass() {
        document.forms.auth.elements.pass.setAttribute("type", "password");
        setIsVisible(!isVisible);
    }

    // обработка запроса авторизации
    async function auth(event) {
        setIsInvalid((prev) => {
            return { ...prev, isInvalid: false };
        });

        event.preventDefault();

        const user = new FormData();
        user.set("email", "");
        user.set("pass", "");

        if (email.current && pass.current !== undefined) {
            user.set("email", email.current.trim());
            user.set("pass", pass.current.trim());
        }

        // проверка на ввод
        for (const [name, value] of user) {
            if (value.trim().length === 0) {
                setIsInvalid({
                    isInvalid: true,
                    result: "Введите что-нибудь...",
                });
                return;
            }
        }

        try {
            setLoader(true);
            let response = await fetch(
                "http://localhost:5600/login",
                // "https://deploy-test-business-assist.herokuapp.com/login",
                {
                    method: "POST",
                    body: user,
                }
            );

            let result = await response.json();
            console.log(result);
            if (result.auth) {
                dispatch(setRegTrueAction(true));
                return result;
            } else {
                setLoader(false);
                if (typeof result.message !== "object") {
                    setIsInvalid({
                        isInvalid: true,
                        result: "Неправильный пароль или email.",
                    });
                }
                return false;
            }
        } catch (error) {
            setLoader(false);
            dispatch(setErrorTrueAction(true, error.message));
        }
    }

    return (
        <>
            {" "}
            {isAuth ? (
                <Navigate to="/" />
            ) : (
                <div id="form" className={classes.login}>
                    <form
                        onSubmit={async (event) => {
                            const user = await auth(event);
                            // устанавливаем токен
                            localStorage.setItem("token", user.token);
                            // email
                            localStorage.setItem("email", email.current);
                            localStorage.setItem("UserId", user.id);
                            const ORGS = await getData(
                                `/private/?UserId=${localStorage.getItem(
                                    "UserId"
                                )}`,
                                () => dispatch(setRegFalseAction(false))
                            );
                            dispatch(setOrgsAction(ORGS));
                        }}
                        name="auth"
                        className={classes.login_frame}
                    >
                        <div className={classes.login_header}>Авторизация</div>
                        {loader ? (
                            <Loader
                                style={{
                                    color: "#495A6F",
                                    borderColor: "#495A6F",
                                    height: "200px",
                                    width: "200px",
                                }}
                            />
                        ) : (
                            <div className={classes.login_auth}>
                                <div className={classes.login_auth_user}>
                                    <div
                                        className={classes.login_auth_user_icon}
                                    ></div>
                                    <input
                                        id="auth-input"
                                        defaultValue={email.current}
                                        onChange={(event) => {
                                            email.current = event.target.value;
                                        }}
                                        name="email"
                                        type="email"
                                        className={
                                            isInvalid.isInvalid
                                                ? classes.login_auth_user_input +
                                                  " " +
                                                  classes.wrong
                                                : classes.login_auth_user_input
                                        }
                                        placeholder="E-mail"
                                    />
                                </div>
                                <div className={classes.login_auth_pass}>
                                    <div
                                        className={classes.login_auth_pass_icon}
                                    ></div>
                                    <input
                                        id="pass-input"
                                        defaultValue={pass.current}
                                        onChange={(event) => {
                                            pass.current = event.target.value;
                                        }}
                                        name="pass"
                                        type="password"
                                        className={
                                            isInvalid.isInvalid
                                                ? classes.login_auth_pass_input +
                                                  " " +
                                                  classes.wrong
                                                : classes.login_auth_pass_input
                                        }
                                        placeholder="Password"
                                    />
                                    <div
                                        onMouseDown={showPass}
                                        onMouseUp={hidePass}
                                        className={
                                            isVisible
                                                ? classes.login_auth_pass_eye
                                                : classes.login_auth_pass_eye_close
                                        }
                                    ></div>
                                </div>
                                <AuthError isInvalid={isInvalid} />
                                <MyInput
                                    type="submit"
                                    value="Войти"
                                    style={{
                                        width: "85%",
                                        height: "35px",
                                        color: "#f0ebde",
                                        margin: "0 auto 0 auto",
                                        fontSize: "1.2em",
                                        textTransform: "uppercase",
                                    }}
                                />
                            </div>
                        )}

                        <div className={classes.login_reg}>
                            <div className={classes.login_reg_forgot}>
                                <MyLink
                                    style={{ color: "#0D1320" }}
                                    path="/login/forgot"
                                >
                                    Забыли пароль?
                                </MyLink>
                            </div>
                            <div className={classes.login_reg_registration}>
                                <MyLink
                                    style={{ color: "#0D1320" }}
                                    path="/login/registration"
                                >
                                    Регистрация
                                </MyLink>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

// `https://deploy-test-business-assist.herokuapp.com/private/?UserId=${localStorage.getItem(
//     "UserId"
// )}`

export default Login;
