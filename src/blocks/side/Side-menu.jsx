import React, { useContext } from "react";
import { CurtainContext } from "../../UI/Curtain/Content/Content.jsx";
import classes from "./styles/side-menu.module.css";
import MyLink from "../../UI/link/MyLink.jsx";
import classNames from "classnames/bind";
import { useTypedSelector } from "../../redux/hooks/hooks.ts";

export default function Side({ showCurtain }) {
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const { curtain } = useContext(CurtainContext);

    const cx = classNames.bind(classes);
    const curtainClassName = cx({
        [classes.side]: true,
        [classes.active]: !curtain,
    });

    return (
        <div onClick={showCurtain} className={curtainClassName}>
            <div className={classes.menu}>
                <MyLink style={{ textDecoration: "none" }} path="/calculator">
                    Калькулятор налогов
                </MyLink>
            </div>

            <div className={classes.menu}>
                <MyLink
                    style={{ textDecoration: "none" }}
                    path={`/counterparties/${USERORG?.id}`}
                >
                    Контрагенты
                </MyLink>
            </div>
            <div className={classes.menu}>
                <MyLink
                    style={{ textDecoration: "none" }}
                    path={`/sales/${USERORG?.id}`}
                >
                    Продажи
                </MyLink>
            </div>
            <div className={classes.menu}>
                <MyLink
                    style={{ textDecoration: "none" }}
                    path={`/purchases/${USERORG?.id}`}
                >
                    Покупки
                </MyLink>
            </div>
        </div>
    );
}
