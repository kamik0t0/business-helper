import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { useSelector } from "react-redux";
import { forgot } from "./service/forgot.js";

export default function Forgot() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRecover, setIsRecover] = useState(false);
    const AUTHERROR = useSelector((state) => state.authErrorReducer);

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

    return (
        <>
            {isRecover ? (
                <Navigate to="/login" />
            ) : (
                <div className={classes.login}>
                    <form
                        onSubmit={(event) =>
                            dispatch(
                                forgot(
                                    event,
                                    email.current,
                                    repeatPass.current,
                                    newPass.current,
                                    () => setLoader(!loader),
                                    () => setIsRecover(!isRecover)
                                )
                            )
                        }
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
                                            AUTHERROR.isInvalid
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
                                            AUTHERROR.isInvalid
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
                                            AUTHERROR.isInvalid
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
                                <AuthError />
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
