import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurtainContext } from "./Content.jsx";
import classes from "./side-menu.module.css";

export default function Side({ showCurtain }) {
    const { curtain } = useContext(CurtainContext);
    return (
        <div
            onClick={showCurtain}
            className={
                curtain ? classes.side : classes.side + " " + classes.active
            }
        >
            <div className={classes.menu}>
                <Link to="/calculator">Калькулятор налогов</Link>
            </div>

            {/* <div className={classes.menu}>
                <Link to="/bank">Банк</Link>
            </div> */}
            <div className={classes.menu}>
                <Link to="/sales">Продажи</Link>
            </div>
            <div className={classes.menu}>
                <Link to="/purchases">Покупки</Link>
            </div>
            {/* <div className={classes.menu}>
                <Link to="/employees">Кадры</Link>
            </div>
            <div className={classes.menu}>
                <Link to="/salary">Зарплата</Link>
            </div> */}
        </div>
    );
}
