import React, { useContext } from "react";
import { ContextBurger } from "../../blocks/header/Header";
import classes from "./styles/burger.module.css";
import classNames from "classnames/bind";

const Burger: React.FC = () => {
    const { burger, showBurger } = useContext(ContextBurger)!;
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
};

export default Burger;
