import classNames from "classnames/bind";
import Link from "../../UI/Link/Link.jsx";
import classes from "./styles/side-menu.module.css";

const SideMenu = ({ showCurtain, curtain, id }) => {
    const cx = classNames.bind(classes);
    const curtainClassName = cx({
        [classes.side]: true,
        [classes.active]: !curtain,
    });

    return (
        <div onClick={showCurtain} className={curtainClassName}>
            <div className={classes.menu}>
                <Link style={{ textDecoration: "none" }} path="/calculator">
                    Калькулятор налогов
                </Link>
            </div>

            <div className={classes.menu}>
                <Link
                    style={{ textDecoration: "none" }}
                    path={`/counterparties/${id}`}
                >
                    Контрагенты
                </Link>
            </div>
            <div className={classes.menu}>
                <Link style={{ textDecoration: "none" }} path={`/sales/${id}`}>
                    Продажи
                </Link>
            </div>
            <div className={classes.menu}>
                <Link
                    style={{ textDecoration: "none" }}
                    path={`/purchases/${id}`}
                >
                    Покупки
                </Link>
            </div>
        </div>
    );
};

export default SideMenu;
