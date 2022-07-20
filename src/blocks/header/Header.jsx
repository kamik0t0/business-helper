import React, { useState } from "react";
import classes from "./styles/header.module.css";
import Avatar from "./avatar/Avatar.jsx";
import Burger from "../../UI/Burger/Burger.jsx";
import Menu from "./menu/Header-menu.jsx";

export const ContextBurger = React.createContext();

const Header = () => {
    const [burger, setBurger] = useState(true);

    function showBurger() {
        setBurger((burger) => !burger);
    }

    return (
        <div className={classes.header}>
            <Avatar />
            <div className={classes.header_site_name}>Бизнес-ассистент</div>
            <ContextBurger.Provider value={{ burger, setBurger, showBurger }}>
                <Menu />
                <Burger />
            </ContextBurger.Provider>
        </div>
    );
};

export default Header;
