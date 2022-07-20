import React, { useContext } from "react";
import classes from "./styles/header-menu.module.css";
import { ContextBurger } from "../Header.jsx";
import MyLink from "../../../UI/link/MyLink.jsx";
import classNames from "classnames/bind";

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
                <MyLink path="/">Главная</MyLink>
            </div>
        </div>
    );
};

export default HeaderMenu;
