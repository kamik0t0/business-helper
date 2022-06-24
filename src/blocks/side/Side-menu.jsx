import React, { useContext } from "react";
import { CurtainContext } from "../../UI/Curtain/Content/Content.jsx";
import classes from "./styles/side-menu.module.css";
import MyLink from "../../UI/link/MyLink.jsx";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

export default function Side({ showCurtain }) {
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    console.log(MYORG);

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
                    path={`/counterparties/${MYORG.id}`}
                >
                    Контрагенты
                </MyLink>
            </div>
            <div className={classes.menu}>
                <MyLink
                    style={{ textDecoration: "none" }}
                    path={`/sales/${MYORG?.id}`}
                >
                    Продажи
                </MyLink>
            </div>
            <div className={classes.menu}>
                <MyLink
                    style={{ textDecoration: "none" }}
                    path={`/purchases/${MYORG.id}`}
                >
                    Покупки
                </MyLink>
            </div>
        </div>
    );
}
