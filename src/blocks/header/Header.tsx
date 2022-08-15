import React, { Dispatch, SetStateAction, useState } from "react";
import Burger from "../../UI/Burger/Burger";
import Avatar from "./avatar/Avatar";
import HeaderMenu from "./menu/Header-menu";
import classes from "./styles/header.module.css";

interface IContextBurger {
    burger: boolean;
    setBurger: Dispatch<SetStateAction<boolean>>;
    showBurger: () => void;
}

export const ContextBurger = React.createContext<IContextBurger | null>(null);

const Header: React.FC = () => {
    const [burger, setBurger] = useState<boolean>(true);
    const showBurger = (): void => setBurger((burger) => !burger);

    const contextValue: IContextBurger = {
        burger,
        setBurger,
        showBurger,
    };

    return (
        <div className={classes.header}>
            <Avatar />
            <div className={classes.header_site_name}>Бизнес-ассистент</div>
            <ContextBurger.Provider value={contextValue}>
                <HeaderMenu />
                <Burger />
            </ContextBurger.Provider>
        </div>
    );
};

export default Header;
