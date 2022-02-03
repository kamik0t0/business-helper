import React, { useState, useRef } from "react";
import classes from "./auth.module.css";
import { Link, Navigate } from "react-router-dom";
import AuthError from "./Auth-error.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import MyInput from "../../../utils/input/MyInput.jsx";

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
        setLoader(true);
        event.preventDefault();

        const user = new FormData();
        user.append("email", email.current.trim());
        user.append("pass", pass.current.trim());
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
                // "http://localhost:5600/login/registration",
                "https://deploy-test-business-assist.herokuapp.com/login/registration",
                {
                    method: "POST",
                    body: user,
                }
            );

            let result = await response.json();
            console.log(result);
            if (result.registered) {
                // ... статус в локальном стейте меняется на зарегистрированный и перенаправляется на страницу авторизации
                setIsReg(true);
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
                                    <Link to="/login">Авторизация</Link>
                                </div>
                                <div className={classes.login_reg_registration}>
                                    <Link to="/login/forgot">
                                        Забыли пароль?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
