import React from "react";
import { Link } from "react-router-dom";
import classes from "./styles/my-link.module.css";
import PropTypes from "prop-types";

export default function MyLink({ children, path, style }) {
    return (
        <>
            <Link style={style} to={path} className={classes.link}>
                {children}
            </Link>
        </>
    );
}

MyLink.propTypes = {
    children: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    style: PropTypes.object,
};
