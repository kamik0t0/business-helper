import React, { useContext } from "react";
import { CurtainContext } from "./Content/Content.jsx";
import classes from "./styles/curtain.module.css";
import classNames from "classnames/bind.js";

export default function Сurtain({ showCurtain }) {
    const { curtain } = useContext(CurtainContext);
    const cx = classNames.bind(classes);
    const curtainClassName = cx({
        [classes.span]: true,
        [classes.active]: !curtain,
    });

    return (
        <div onClick={showCurtain} className={classes.side_curtain}>
            <div className={classes.arrow}>
                <span className={curtainClassName}></span>
            </div>
        </div>
    );
}
