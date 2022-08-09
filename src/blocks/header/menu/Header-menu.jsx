import classNames from "classnames/bind";
import React, { useContext } from "react";
import Link from "../../../UI/Link/Link";
import { ContextBurger } from "../Header.jsx";
import classes from "./styles/header-menu.module.css";

const HeaderMenu = () => {
    const { burger, showBurger } = useContext(ContextBurger);
    const cx = classNames.bind(classes);
    const burgerClassName = cx({
        [classes.header_menu]: true,
        [classes.active]: !burger,
    });
    return (
        <div onClick={showBurger} className={burgerClassName}>
            <div className={classes.header_option}>
                <Link path="/">Главная</Link>
            </div>
        </div>
    );
};

export default HeaderMenu;
