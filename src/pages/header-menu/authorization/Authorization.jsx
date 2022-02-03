import React, { useState, useRef } from "react";
import classes from "./auth.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthError from "./Auth-error.jsx";
import { getMyOrgsFromDB } from "../../../utils/getOrgs.js";
import { isOrgBelongsUser } from "../../../utils/getOrgs.js";
import Loader from "../../../UI/Loader/Loader.jsx";
import MyInput from "../../../utils/input/MyInput.jsx";

export default function Login() {
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
        setLoader(true);
        event.preventDefault();

        const user = new FormData();
        user.set("email", email.current.trim());
        user.set("pass", pass.current.trim());
        // проверка на ввод
        for (const [name, value] of user) {
            if (value.trim().length === 0) {
                setLoader(false);
                setIsInvalid({
                    isInvalid: true,
                    result: "Введите что-нибудь...",
                });
                return;
            }
        }

        try {
            let response = await fetch(
                // "http://localhost:5600/login",
                "https://deploy-test-business-assist.herokuapp.com/login",
                {
                    method: "POST",
                    body: user,
                }
            );

            let result = await response.json();
            console.log(result);
            if (result.auth) {
                // статус пользователя меняется на авторизованный
                dispatch({ type: "REG_TRUE", payload: true });
                return result;
            } else {
                setLoader(false);
                // запрос может пройти, но БД может ограничивать количество обращений за единицу времени и это приведет к ошибке. В этом случае получим объект result.message
                if (typeof result.message === "object") {
                    // в поле code содержится код ошибки
                    dispatch({
                        type: "isERROR_TRUE",
                        payload: true,
                        message: result.message.code,
                    });
                } else {
                    setIsInvalid({
                        isInvalid: true,
                        result: "Неправильный пароль или email.",
                    });
                }
                return false;
            }
        } catch (error) {
            // если запрос не проходит
            console.log("Auth Error", error);
            setLoader(false);
            dispatch({
                type: "isERROR_TRUE",
                payload: true,
                message: "No connection to server",
            });
        }
    }

    return (
        <>
            {" "}
            {isAuth ? (
                <Navigate to="/" />
            ) : (
                <div className={classes.login}>
                    <form
                        onSubmit={async (event) =>
                            await auth(event)
                                .then((result) => {
                                    // устанавливаем токен
                                    localStorage.setItem("token", result.token);
                                    // email
                                    localStorage.setItem(
                                        "email",
                                        email.current
                                    );
                                    // вспомогательный флаг для сессии
                                    localStorage.setItem("session", true);
                                    localStorage.setItem("UserId", result.id);
                                })
                                .then(
                                    async () =>
                                        await getMyOrgsFromDB(
                                            `https://deploy-test-business-assist.herokuapp.com/private/?UserId=${localStorage.getItem(
                                                "UserId"
                                            )}`
                                            // `http://localhost:5600/private/?UserId=${localStorage.getItem(
                                            //     "UserId"
                                            // )}`
                                        )
                                )
                                .then(async () => await isOrgBelongsUser())
                                .catch((error) => {
                                    console.log(error, "session faild");
                                    // флаг текущей сессии удаляется
                                    localStorage.removeItem("session");
                                })
                        }
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
                                <Link to="/login/forgot">Забыли пароль?</Link>
                            </div>
                            <div className={classes.login_reg_registration}>
                                <Link to="/login/registration">
                                    Регистрация
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
