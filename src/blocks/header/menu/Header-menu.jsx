import React, { useContext } from "react";
import classes from "./styles/header-menu.module.css";
import { ContextBurger } from "../Header.jsx";
import MyLink from "../../../UI/link/MyLink.jsx";

export default function Menu() {
    const { burger, showBurger } = useContext(ContextBurger);
    return (
        <div
            onClick={showBurger}
            className={
                burger
                    ? classes.header_menu
                    : classes.header_menu + " " + classes.active
            }
        >
            <div className={classes.header_option}>
                {" "}
                <MyLink path="/">Главная</MyLink>
            </div>
        </div>
    );
}
