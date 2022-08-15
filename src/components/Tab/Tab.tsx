import { FC, ReactNode } from "react";
import classes from "./styles/tab.module.css";
import classNames from "classnames/bind";
import { useTab } from "./hooks/useTab";

const Tab: FC<{
    children: string | ReactNode;
    header: string;
    style?: object;
}> = ({ children, header, style }) => {
    const [tab, showTab] = useTab(false);

    const cx = classNames.bind(classes);
    const tabClass = cx({
        [classes.tab]: true,
        [classes.show]: tab,
    });
    return (
        <>
            <div onClick={showTab} className={tabClass}>
                <div className={classes.header}>{header}</div>

                <div style={style} className={classes.textcontent}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Tab;
