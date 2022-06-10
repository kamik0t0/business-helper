import React, { useContext } from "react";
import { ContextBurger } from "../../blocks/header/Header.jsx";
import classes from "./styles/burger.module.css";
import classNames from "classnames/bind";

export default function Burger() {
    const { burger, showBurger } = useContext(ContextBurger);
    const cx = classNames.bind(classes);
    const burgerClassName = cx({
        [classes.header_burger]: true,
        [classes.active]: !burger,
    });

    return (
        <header className={burgerClassName} onClick={showBurger}>
            <span></span>
        </header>
    );
}
