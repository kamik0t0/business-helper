import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { validatePass } from "../../utils/validatePass.js";

export default function Registration() {
    const [isVisible, setIsVisible] = useState(false);
    const [isReg, setIsReg] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        isInvalid: false,
        result: "",
    });
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    let email = useRef();
    let pass = useRef();

    // регистрация
    async function addUser(event) {
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

            if (!validatePass(pass.current.trim())) {
                setIsInvalid({
                    isInvalid: true,
                    result: "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать  -, (, ),  , /",
                });
                return;
            }
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
                "http://localhost:5600/login/registration",
                // "https://deploy-test-business-assist.herokuapp.com/login/registration",
                {
                    method: "POST",
                    body: user,
                }
            );

            let result = await response.json();
            if (result.registered) {
                // ... статус в локальном стейте меняется на зарегистрированный и перенаправляется на страницу авторизации
                setIsReg(true);
                console.log(result.message);
            } else {
                setLoader(false);
                if (result.error) {
                    dispatch({
                        type: "isERROR_TRUE",
                        payload: true,
                        message: result.error,
                    });
                } else {
                    setIsInvalid({
                        isInvalid: true,
                        result: result.message,
                    });
                }

                console.log(result);
            }
        } catch (error) {
            // если запрос не проходит
            console.log("Reg Error", error);
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
            {isReg ? (
                <Navigate to="/login" />
            ) : (
                <>
                    <div className={classes.login}>
                        <form
                            onSubmit={addUser}
                            name="auth"
                            id="auth"
                            className={classes.login_frame}
                        >
                            <div className={classes.login_header}>
                                Регистрация
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
                                            className={
                                                classes.login_auth_user_icon
                                            }
                                        ></div>
                                        <input
                                            defaultValue={email.current}
                                            onChange={(event) => {
                                                email.current =
                                                    event.target.value;
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
                                            className={
                                                classes.login_auth_pass_icon
                                            }
                                        ></div>
                                        <input
                                            defaultValue={pass.current}
                                            minLength={10}
                                            onChange={(event) => {
                                                pass.current =
                                                    event.target.value;
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
                                            onMouseDown={() => {
                                                document.forms.auth.elements.pass.setAttribute(
                                                    "type",
                                                    "text"
                                                );
                                                setIsVisible(!isVisible);
                                            }}
                                            onMouseUp={() => {
                                                document.forms.auth.elements.pass.setAttribute(
                                                    "type",
                                                    "password"
                                                );
                                                setIsVisible(!isVisible);
                                            }}
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
                                        value="Зарегистрироваться"
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
                                        path="/login/forgot"
                                    >
                                        Забыли пароль?
                                    </MyLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
