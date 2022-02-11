import React, { useContext } from "react";
import { CurtainContext } from "../../UI/Curtain/Content/Content.jsx";
import classes from "./styles/side-menu.module.css";
import MyLink from "../../UI/link/MyLink.jsx";

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
                <MyLink style={{ textDecoration: "none" }} path="/calculator">
                    Калькулятор налогов
                </MyLink>
            </div>

            <div className={classes.menu}>
                <MyLink style={{ textDecoration: "none" }} path="/sales">
                    Продажи
                </MyLink>
            </div>
            <div className={classes.menu}>
                <MyLink style={{ textDecoration: "none" }} path="/purchases">
                    Покупки
                </MyLink>
            </div>
        </div>
    );
}
