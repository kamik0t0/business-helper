import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./styles/avatar.module.css";
import MyLink from "../../../UI/link/MyLink.jsx";

export default function Avatar() {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const dispatch = useDispatch();

    const auth = useRef();
    const enter = useRef();
    const exit = useRef();

    function auth_Handler(event) {
        event.preventDefault();
        dispatch({ type: "REG_FALSE", payload: !isAuth });
        hideIconMenu();
    }

    // убирает меню
    function hideIconMenu() {
        auth.current.classList.add(classes.nohover);
        enter.current.classList.remove(classes.header_auth_menu);
        exit.current.classList.remove(classes.header_auth_menu);
    }

    // показывает меню
    function showIconMenu(event) {
        auth.current.classList.remove(classes.nohover);
        if (event.target.id !== "icon") return;
        if (isAuth) {
            exit.current.classList.add(classes.header_auth_menu);
        } else {
            enter.current.classList.add(classes.header_auth_menu);
        }
    }

    return (
        <div
            ref={auth}
            id="auth"
            className={classes.header_auth}
            onMouseOver={showIconMenu}
            onMouseLeave={hideIconMenu}
        >
            <div id="icon" className={classes.header_auth_icon} />
            <div id="exit" className={classes.displaynone} ref={exit}>
                <div
                    onClick={hideIconMenu}
                    className={classes.header_auth_menu_item}
                >
                    <MyLink
                        style={{ textDecoration: "none", fontSize: "1em" }}
                        path="/private"
                    >
                        Личный кабинет
                    </MyLink>
                </div>
                <div
                    onClick={auth_Handler}
                    className={classes.header_auth_menu_item}
                >
                    <MyLink
                        style={{ textDecoration: "none", fontSize: "1em" }}
                        path="/"
                    >
                        Выйти
                    </MyLink>
                </div>
            </div>
            <div id="enter" className={classes.displaynone} ref={enter}>
                <div
                    onClick={hideIconMenu}
                    className={classes.header_auth_menu_item}
                >
                    <MyLink
                        style={{ textDecoration: "none", fontSize: "1em" }}
                        path="/login"
                    >
                        Войти
                    </MyLink>
                </div>
            </div>
        </div>
    );
}
