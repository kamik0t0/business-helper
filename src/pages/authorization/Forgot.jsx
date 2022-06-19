import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import classNames from "classnames/bind";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { useSelector } from "react-redux";
import { forgot } from "./service/forgot.js";
import { loaderStyle, submitStyle } from "./service/inlineStyles";

export default function Forgot() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRecover, setIsRecover] = useState(false);
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

    let email = useRef();
    let newPass = useRef();
    let repeatPass = useRef();
    const form = useRef();

    function showPass() {
        form.current.new_password.setAttribute("type", "text");
        form.current.repeat_password.setAttribute("type", "text");
        setIsVisible(true);
    }

    function hidePass() {
        form.current.new_password.setAttribute("type", "password");
        form.current.repeat_password.setAttribute("type", "password");
        setIsVisible(false);
    }

    const dispatchRecover = (event) =>
        dispatch(
            forgot(
                event,
                email.current,
                repeatPass.current,
                newPass.current,
                () => setLoader(!loader),
                () => setIsRecover(!isRecover)
            )
        );
    const getEmail = (event) => {
        email.current = event.target.value;
    };
    const getNewPass = (event) => {
        newPass.current = event.target.value;
    };
    const getRepeatedPass = (event) => {
        repeatPass.current = event.target.value;
    };

    return (
        <>
            {isRecover ? (
                <Navigate to="/login" />
            ) : (
                <div className={classes.login}>
                    <form
                        ref={form}
                        onSubmit={dispatchRecover}
                        name="auth"
                        className={classes.login_frame}
                    >
                        <div className={classes.login_header}>
                            Восстановление пароля
                        </div>
                        {loader ? (
                            <Loader style={loaderStyle} />
                        ) : (
                            <div className={classes.login_auth}>
                                <div className={classes.login_auth_user}>
                                    <div
                                        className={classes.login_auth_user_icon}
                                    ></div>
                                    <input
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
                                        defaultValue={newPass.current}
                                        onChange={getNewPass}
                                        name="new_password"
                                        type="password"
                                        className={authErrPass}
                                        placeholder="New Password"
                                    />
                                    <div
                                        onMouseDown={showPass}
                                        onMouseUp={hidePass}
                                        className={passVisibility}
                                    ></div>
                                </div>
                                <div className={classes.login_auth_pass}>
                                    <div
                                        className={classes.login_auth_pass_icon}
                                    ></div>
                                    <input
                                        defaultValue={repeatPass.current}
                                        onChange={getRepeatedPass}
                                        name="repeat_password"
                                        type="password"
                                        className={authErrPass}
                                        placeholder="Repeat Password"
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
                                    value="Новый пароль"
                                    style={submitStyle}
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
