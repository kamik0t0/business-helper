import { useContext } from "react";
import { CurtainContext } from "../../UI/Curtain/Content/Content.jsx";
import classes from "./styles/side-menu.module.css";
import MyLink from "../../UI/link/MyLink.jsx";
import classNames from "classnames/bind";

const SideMenu = ({ showCurtain, id }) => {
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
                    path={`/counterparties/${id}`}
                >
                    Контрагенты
                </MyLink>
            </div>
            <div className={classes.menu}>
                <MyLink
                    style={{ textDecoration: "none" }}
                    path={`/sales/${id}`}
                >
                    Продажи
                </MyLink>
            </div>
            <div className={classes.menu}>
                <MyLink
                    style={{ textDecoration: "none" }}
                    path={`/purchases/${id}`}
                >
                    Покупки
                </MyLink>
            </div>
        </div>
    );
};

export default SideMenu;
