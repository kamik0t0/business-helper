import React, { useState } from "react";
import classes from "./auth.module.css";
import { Link, Navigate } from "react-router-dom";
import AuthError from "./Auth-error.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import MyInput from "../../../utils/input/MyInput.jsx";

export default function Forgot() {
    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({
        email: "",
        newPass: "",
        repeatPass: "",
    });
    const [isRecover, setIsRecover] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        isInvalid: false,
        result: "",
    });
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

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
    async function sendAuthData(event) {
        setIsInvalid((prev) => {
            return { ...prev, isInvalid: false };
        });
        event.preventDefault();
        try {
            const user = new FormData();
            const passCompare = form.newPass.localeCompare(form.repeatPass);
            let response;
            if (passCompare === 0) {
                setLoader(true);
                user.append("email", form.email.trim());
                user.append("pass", form.repeatPass.trim());
                // проверка на ввод
                for (const [name, value] of user) {
                    console.log(value);
                    if (value.trim().length === 0) {
                        setLoader(false);
                        setIsInvalid(() => {
                            return {
                                isInvalid: true,
                                result: "Введите что-нибудь...",
                            };
                        });
                        return;
                    }
                }

                response = await fetch(
                    // "http://localhost:5600/login/forgot",
                    "https://deploy-test-business-assist.herokuapp.com/login/forgot",
                    {
                        method: "PATCH",
                        body: user,
                    }
                );
            } else {
                setIsInvalid({
                    isInvalid: true,
                    result: "Пароли не совпадают! Попробуйте снова!",
                });
                return;
            }

            let result = await response.json();

            // если registered = true
            if (result.updated) {
                // ... статус в локальном стейте меняется на зарегистрированный и перенаправляется на страницу авторизации
                setIsRecover(true);
                console.log(result.message);
            } else {
                setLoader(false);
                setIsInvalid({ isInvalid: true, result: result.message });
                console.log(result.message);
            }
        } catch (error) {
            setLoader(false);
            dispatch({ type: "isERROR_TRUE", payload: true });
            console.log("No connection to server/");
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
                        onSubmit={sendAuthData}
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
                                        className={classes.login_auth_pass_icon}
                                    ></div>
                                    <input
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                newPass: event.target.value,
                                            })
                                        }
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
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                repeatPass: event.target.value,
                                            })
                                        }
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
                                <Link to="/login">Авторизация</Link>
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
