import React from "react";
import classes from "./styles/tab.module.css";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useTab } from "../../hooks/useTab.js";

export default function Tab({ children, header, style }) {
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
}

Tab.propTypes = {
    header: PropTypes.string.isRequired,
    style: PropTypes.object,
};
