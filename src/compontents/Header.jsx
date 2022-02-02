import React, { useState } from "react";
import Avatar from "./Avatar.jsx";
import Burger from "./Burger.jsx";
import Menu from "./Header-menu.jsx";
import SiteName from "./Header-site-name.jsx";
import classes from "./header.module.css";

export const ContextBurger = React.createContext();

export default function Header() {
    const [burger, setBurger] = useState(true);

    function showBurger() {
        setBurger((burger) => !burger);
    }

    return (
        <div className={classes.header}>
            <Avatar />
            <SiteName />
            <ContextBurger.Provider value={{ burger, setBurger, showBurger }}>
                <Menu />
                <Burger />
            </ContextBurger.Provider>
        </div>
    );
}
