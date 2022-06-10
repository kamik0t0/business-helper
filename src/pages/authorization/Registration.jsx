import React, { useState, useRef } from "react";
import classes from "./styles/auth.module.css";
import classNames from "classnames/bind";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthError from "./service/error/Auth-error.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { addUser } from "./service/registration.js";

export default function Registration() {
    const [isVisible, setIsVisible] = useState(false);
    const [isReg, setIsReg] = useState(false);
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
    let pass = useRef();
    const form = useRef();

    return (
        <>
            {isReg ? (
                <Navigate to="/login" />
            ) : (
                <>
                    <div className={classes.login}>
                        <form
                            ref={form}
                            onSubmit={(event) =>
                                dispatch(
                                    addUser(
                                        event,
                                        email.current,
                                        pass.current,
                                        () => setIsReg(!isReg),
                                        setLoader
                                    )
                                )
                            }
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
                                            className={authErrUser}
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
                                            className={authErrPass}
                                            placeholder="Password"
                                        />
                                        <div
                                            onMouseDown={() => {
                                                form.current.pass.setAttribute(
                                                    "type",
                                                    "text"
                                                );
                                                setIsVisible(!isVisible);
                                            }}
                                            onMouseUp={() => {
                                                form.current.pass.setAttribute(
                                                    "type",
                                                    "password"
                                                );
                                                setIsVisible(!isVisible);
                                            }}
                                            className={passVisibility}
                                        ></div>
                                    </div>
                                    <AuthError />
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
