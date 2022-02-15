import React from "react";
import classes from "./styles/my-button.module.css";
import PropTypes from "prop-types";

export default function MyButton({ children, style, ...props }) {
    return (
        <button style={style} className={classes.button} {...props}>
            {children}
        </button>
    );
}

MyButton.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.object,
};
