import React, { useState } from "react";
import Side from "./Side-menu.jsx";
import Main from "./Main.jsx";
import Curtain from "./Curtain.jsx";
import classes from "./content.module.css";

export const CurtainContext = React.createContext();

export default function Content() {
    const [curtain, setCurtain] = useState(true);

    function showCurtain() {
        setCurtain((curtain) => !curtain);
    }

    return (
        <div id="content" className={classes.content}>
            <CurtainContext.Provider value={{ curtain, setCurtain }}>
                {" "}
                <Curtain showCurtain={showCurtain} />
                <Side showCurtain={showCurtain} />
            </CurtainContext.Provider>

            <Main />
        </div>
    );
}
