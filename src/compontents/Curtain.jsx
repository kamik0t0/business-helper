import React, { useContext } from "react";
import { CurtainContext } from "./Content.jsx";
import classes from "./curtain.module.css";

export default function Сurtain({ showCurtain }) {
    const { curtain } = useContext(CurtainContext);

    return (
        <div onClick={showCurtain} className={classes.side_curtain}>
            <div className={classes.arrow}>
                <span
                    className={
                        curtain
                            ? classes.span
                            : classes.span + " " + classes.active
                    }
                ></span>
            </div>
        </div>
    );
}
