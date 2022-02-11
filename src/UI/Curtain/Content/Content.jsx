import React, { useState } from "react";
import classes from "./styles/content.module.css";
import Side from "../../../blocks/side/Side-menu.jsx";
import Main from "../../../blocks/content/Main.jsx";
import Curtain from "../../../UI/Curtain/Curtain.jsx";

export const CurtainContext = React.createContext();

export default function Content() {
    const [curtain, setCurtain] = useState(true);

    function showCurtain() {
        setCurtain((curtain) => !curtain);
    }

    return (
        <div id="content" className={classes.content}>
            <CurtainContext.Provider value={{ curtain, setCurtain }}>
                <Curtain showCurtain={showCurtain} />
                <Side showCurtain={showCurtain} />
            </CurtainContext.Provider>

            <Main />
        </div>
    );
}
