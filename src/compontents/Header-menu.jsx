import React, { useContext } from "react";
import { ContextBurger } from "./Header.jsx";
import { Link } from "react-router-dom";
import classes from "./header-menu.module.css";

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
                <Link to="/" className={classes.link}>
                    Главная
                </Link>
            </div>

            {/* <div className={classes.header_options}>О сайте</div> */}
        </div>
    );
}
