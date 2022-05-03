import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
// import { auth } from "./service/auth.js";
import { auth } from "../../redux/saga/auth-saga.js";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const AUTHERROR = useSelector((state) => state.authErrorReducer);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    let email = useRef("Cap_NEMOx86@inbox.ru");
    let pass = useRef("kdkfjdilkmf2312387");
    const form = useRef();

    // Показать пароль
    function showPass() {
        form.current.pass.setAttribute("type", "text");
        setIsVisible(!isVisible);
    }
    // Спрятать пароль
    function hidePass() {
        form.current.pass.setAttribute("type", "password");
        setIsVisible(!isVisible);
    }

    return (
        <>
            {" "}
            {isAuth ? (
                <Navigate to="/" />
            ) : (
                <div id="form" className={classes.login}>
                    <form
                        ref={form}
                        onSubmit={(event) =>
                            dispatch(
                                auth(
                                    event,
                                    email.current,
                                    pass.current,
                                    () => setLoader
                                )
                            )
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
                                        id="auth-input"
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
                                        id="pass-input"
                                        defaultValue={pass.current}
                                        onChange={(event) => {
                                            pass.current = event.target.value;
                                        }}
                                        name="pass"
                                        type="password"
                                        className={
                                            AUTHERROR.isInvalid
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
                                <AuthError />
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
