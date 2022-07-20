import React, { useState } from "react";
import classes from "./styles/content.module.css";
import SideMenu from "../../../blocks/side/Side-menu.jsx";
import Main from "../../../blocks/content/Main.jsx";
import Curtain from "../../../UI/Curtain/Curtain.jsx";
import { useTypedSelector } from "../../../redux/hooks/hooks";

export const CurtainContext = React.createContext();

export default function Content() {
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const [curtain, setCurtain] = useState(true);

    function showCurtain() {
        setCurtain((curtain) => !curtain);
    }

    return (
        <div id="content" className={classes.content}>
            <CurtainContext.Provider value={{ curtain, setCurtain }}>
                <Curtain showCurtain={showCurtain} />
                <SideMenu
                    showCurtain={showCurtain}
                    id={USERORG && USERORG.id}
                />
            </CurtainContext.Provider>

            <Main />
        </div>
    );
}
