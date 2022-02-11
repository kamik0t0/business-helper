import React, { useContext } from "react";
import { ContextBurger } from "../../blocks/header/Header.jsx";
import classes from "./styles/burger.module.css";

export default function Burger() {
    const { burger, showBurger } = useContext(ContextBurger);

    return (
        <header
            className={
                burger
                    ? classes.header_burger
                    : classes.header_burger + " " + classes.active
            }
            onClick={showBurger}
        >
            <span></span>
        </header>
    );
}
