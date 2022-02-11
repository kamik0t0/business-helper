import React, { useState } from "react";
import classes from "./styles/tab.module.css";

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
