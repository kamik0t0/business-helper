import React, { memo } from "react";
import classes from "./styles/my-button.module.css";
import PropTypes from "prop-types";

const MyButton = memo(({ children, style, ...props }) => {
    return (
        <button style={style} className={classes.button} {...props}>
            {children}
        </button>
    );
});

MyButton.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.object,
};

export default MyButton;
