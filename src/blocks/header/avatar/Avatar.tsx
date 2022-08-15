import React, { useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";
import { setAuth } from "../../../redux/reducers/authSlice";
import Link from "../../../UI/Link/Link";
import classes from "./styles/avatar.module.css";

const Avatar: React.FC = () => {
    const { isAuth } = useTypedSelector((state) => state.authReducer);
    const dispatch = useTypedDispatch();

    const auth = useRef<HTMLDivElement>(null!);
    const enter = useRef<HTMLDivElement>(null!);
    const exit = useRef<HTMLDivElement>(null!);

    // меняет состояние в redux
    function auth_Handler(event: React.MouseEvent): void {
        event.preventDefault();
        dispatch(setAuth(!isAuth));
        hideIconMenu();
    }

    // убирает меню
    function hideIconMenu(): void {
        auth.current.classList.add(classes.nohover);
        enter.current.classList.remove(classes.header_auth_menu);
        exit.current.classList.remove(classes.header_auth_menu);
    }

    // показывает меню
    function showIconMenu(event: React.MouseEvent<HTMLDivElement>): void {
        auth.current.classList.remove(classes.nohover);
        // if (event.target.id !== "icon") return;
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
                    <Link
                        style={{ textDecoration: "none", fontSize: "1em" }}
                        path="/private"
                    >
                        Личный кабинет
                    </Link>
                </div>
                <div
                    onClick={auth_Handler}
                    className={classes.header_auth_menu_item}
                >
                    <Link
                        style={{ textDecoration: "none", fontSize: "1em" }}
                        path="/"
                    >
                        Выйти
                    </Link>
                </div>
            </div>
            <div id="enter" className={classes.displaynone} ref={enter}>
                <div
                    onClick={hideIconMenu}
                    className={classes.header_auth_menu_item}
                >
                    <Link
                        style={{ textDecoration: "none", fontSize: "1em" }}
                        path="/login"
                    >
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
