import React, { useState } from "react";
import classes from "./styles/tab.module.css";
import PropTypes from "prop-types";

export default function Tab({ children, header }) {
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

                <div className={classes.textcontent}>{children}</div>
            </div>
        </>
    );
}

Tab.propTypes = {
    children: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
};
