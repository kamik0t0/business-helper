import React, { useState } from "react";
import classes from "./auth.module.css";
import { Link, Navigate } from "react-router-dom";
import AuthError from "./Auth-error.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import MyInput from "../../../utils/input/MyInput.jsx";

export default function Registration() {
    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({ email: "", pass: "" });
    const [isReg, setIsReg] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        isInvalid: false,
        result: "",
    });
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    // регистрация
    async function addUser(event) {
        setLoader(true);
        event.preventDefault();
        try {
            const user = new FormData();
            user.append("email", form.email.trim());
            user.append("pass", form.pass.trim());
            console.log(user);

            let response = await fetch(
                "http://localhost:5600/login/registration",
                {
                    method: "POST",
                    body: user,
                }
            );

            let result = await response.json();

            // если registered = true
            if (result.registered) {
                // ... статус в локальном стейте меняется на зарегистрированный и перенаправляется на страницу авторизации
                setIsReg(true);
                console.log(result.message);
            } else {
                setLoader(false);
                setIsInvalid({ isInvalid: true, result: result.message });
                console.log(result.message);
            }
        } catch (error) {
            setLoader(false);
            dispatch({ type: "isERROR_TRUE", payload: true });
            console.log("No connection to server.");
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
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    email: event.target.value,
                                                })
                                            }
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
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    pass: event.target.value,
                                                })
                                            }
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
