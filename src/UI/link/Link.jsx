import React, { memo } from "react";
import { Link } from "react-router-dom";
import classes from "./styles/my-link.module.css";
import PropTypes from "prop-types";

const isEqual = (prev, next) => {
    if (prev.path === next.path) return true;
    return false;
};

const CustomLink = memo(({ children, path, style }) => {
    return (
        <>
            <Link style={style} to={path} className={classes.link}>
                {children}
            </Link>
        </>
    );
}, isEqual);

CustomLink.propTypes = {
    children: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    style: PropTypes.object,
};

export default CustomLink;
