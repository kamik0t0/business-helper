import classes from "./styles/curtain.module.css";
import classNames from "classnames/bind.js";

type CurtainType = {
    showCurtain: () => void;
    curtain: boolean;
};

const Сurtain: React.FC<CurtainType> = ({ showCurtain, curtain }) => {
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
};

export default Сurtain;
