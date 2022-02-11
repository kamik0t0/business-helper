import React from "react";
import classes from "./styles/my-button.module.css";

export default function MyButton({ children, style, ...props }) {
    return (
        <button style={style} className={classes.button} {...props}>
            {children}
        </button>
    );
}
