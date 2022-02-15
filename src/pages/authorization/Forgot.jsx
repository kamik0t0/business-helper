import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { validatePass } from "../../utils/validatePass.js";

export default function Forgot() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRecover, setIsRecover] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        isInvalid: false,
        result: "",
    });
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    let email = useRef();
    let newPass = useRef();
    let repeatPass = useRef();

    function showPass() {
        document.forms.auth.elements.new_password.setAttribute("type", "text");
        document.forms.auth.elements.repeat_password.setAttribute(
            "type",
            "text"
        );
        setIsVisible(true);
    }

    function hidePass() {
        document.forms.auth.elements.new_password.setAttribute(
            "type",
            "password"
        );
        document.forms.auth.elements.repeat_password.setAttribute(
            "type",
            "password"
        );
        setIsVisible(false);
    }

    // запрос обновления пароля
    async function forgot(event) {
        setIsInvalid((prev) => {
            return { ...prev, isInvalid: false };
        });

        event.preventDefault();

        const user = new FormData();

        user.set("email", "");
        user.set("pass", "");

        if (
            email.current &&
            repeatPass.current &&
            newPass.current !== undefined
        ) {
            user.set("email", email.current.trim());
            user.set("pass", repeatPass.current.trim());
            user.set("pass", newPass.current.trim());
            // проверка идентичности введенных паролей
            if (newPass.current.localeCompare(repeatPass.current) !== 0) {
                setLoader(false);
                setIsInvalid({
                    isInvalid: true,
                    result: "Пароли не совпадают!",
                });

                return;
            }

            if (!validatePass(newPass.current.trim())) {
                setIsInvalid({
                    isInvalid: true,
                    result: "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать  -, (, ),  , /",
                });
                return;
            }
        }

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
                "http://localhost:5600/login/forgot",
                // "https://deploy-test-business-assist.herokuapp.com/login/forgot",
                {
                    method: "PATCH",
                    body: user,
                }
            );

            let result = await response.json();
            console.log(result);
            if (result.updated) {
                // ... статус в локальном стейте меняется на зарегистрированный и перенаправляется на страницу авторизации
                setIsRecover(true);
                console.log(result.message);
            } else {
                setLoader(false);
                if (typeof result.message === "object") {
                    dispatch({
                        type: "isERROR_TRUE",
                        payload: true,
                        message: result.message.code,
                    });
                } else {
                    setIsInvalid({
                        isInvalid: true,
                        result: result.message,
                    });
                }
                console.log(result.message);
            }
        } catch (error) {
            // если запрос не проходит
            console.log("Recover Error", error);
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
            {isRecover ? (
                <Navigate to="/login" />
            ) : (
                <div className={classes.login}>
                    <form
                        onSubmit={forgot}
                        name="auth"
                        className={classes.login_frame}
                    >
                        <div className={classes.login_header}>
                            Восстановление пароля
                        </div>
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
                                        defaultValue={newPass.current}
                                        onChange={(event) => {
                                            newPass.current =
                                                event.target.value;
                                        }}
                                        name="new_password"
                                        type="password"
                                        className={
                                            isInvalid.isInvalid
                                                ? classes.login_auth_pass_input +
                                                  " " +
                                                  classes.wrong
                                                : classes.login_auth_pass_input
                                        }
                                        placeholder="New Password"
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
                                <div className={classes.login_auth_pass}>
                                    <div
                                        className={classes.login_auth_pass_icon}
                                    ></div>
                                    <input
                                        defaultValue={repeatPass.current}
                                        onChange={(event) => {
                                            repeatPass.current =
                                                event.target.value;
                                        }}
                                        name="repeat_password"
                                        type="password"
                                        className={
                                            isInvalid.isInvalid
                                                ? classes.login_auth_pass_input +
                                                  " " +
                                                  classes.wrong
                                                : classes.login_auth_pass_input
                                        }
                                        placeholder="Repeat Password"
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
                                    value="Новый пароль"
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
                            <div className={classes.login_reg_registration}>
                                <MyLink
                                    style={{ color: "#0D1320" }}
                                    path="/login"
                                >
                                    Авторизация
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
