import React from "react";
import classes from "./my-button.module.css";

export default function MyButton({ children, ...props }) {
    return (
        <button className={classes.button} {...props}>
            {children}
        </button>
    );
}
