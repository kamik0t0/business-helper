import React, { useState } from "react";
import classes from "./styles/tab.module.css";
import PropTypes from "prop-types";

export default function Tab({ children, header, style }) {
    const [showTab, setShowTab] = useState(false);
    return (
        <>
            <div
                onClick={() => setShowTab(!showTab)}
                className={
                    showTab ? classes.tab + " " + classes.show : classes.tab
                }
            >
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
