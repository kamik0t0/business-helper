import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import classNames from "classnames/bind";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { auth } from "../../redux/saga/auth-saga.js";
import { loaderStyle, submitStyle } from "./service/inlineStyles";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const AUTHERROR = useSelector((state) => state.authErrorReducer);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const cx = classNames.bind(classes);
    const authErrUser = cx({
        [classes.login_auth_user_input]: true,
        [classes.wrong]: AUTHERROR.isInvalid,
    });
    const authErrPass = cx({
        [classes.login_auth_pass_input]: true,
        [classes.wrong]: AUTHERROR.isInvalid,
    });
    const passVisibility = cx({
        [classes.login_auth_pass_eye]: isVisible,
        [classes.login_auth_pass_eye_close]: !isVisible,
    });

    let email = useRef("Cap_NEMOx86@inbox.ru");
    let pass = useRef("kdkfjdilkmf2312387");
    const form = useRef();

    function showPass() {
        form.current.pass.setAttribute("type", "text");
        setIsVisible(!isVisible);
    }
    function hidePass() {
        form.current.pass.setAttribute("type", "password");
        setIsVisible(!isVisible);
    }
    const getEmail = (event) => {
        email.current = event.target.value;
    };
    const getPass = (event) => {
        email.current = event.target.value;
    };
    const dispatchAuth = (event) =>
        dispatch(auth(event, email.current, pass.current, () => setLoader));

    return (
        <>
            {isAuth ? (
                <Navigate to="/" />
            ) : (
                <div id="form" className={classes.login}>
                    <form
                        ref={form}
                        onSubmit={dispatchAuth}
                        name="auth"
                        className={classes.login_frame}
                    >
                        <div className={classes.login_header}>Авторизация</div>
                        {loader ? (
                            <Loader style={loaderStyle} />
                        ) : (
                            <div className={classes.login_auth}>
                                <div className={classes.login_auth_user}>
                                    <div
                                        className={classes.login_auth_user_icon}
                                    ></div>
                                    <input
                                        id="auth-input"
                                        defaultValue={email.current}
                                        onChange={getEmail}
                                        name="email"
                                        type="email"
                                        className={authErrUser}
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
                                        onChange={getPass}
                                        name="pass"
                                        type="password"
                                        className={authErrPass}
                                        placeholder="Password"
                                    />
                                    <div
                                        onMouseDown={showPass}
                                        onMouseUp={hidePass}
                                        className={passVisibility}
                                    ></div>
                                </div>
                                <AuthError />
                                <MyInput
                                    type="submit"
                                    value="Войти"
                                    style={submitStyle}
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
