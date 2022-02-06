import React from "react";
import { Link } from "react-router-dom";
import classes from "./my-link.module.css";

export default function MyLink({ children, path, style }) {
    return (
        <>
            <Link style={style} to={path} className={classes.link}>
                {children}
            </Link>
        </>
    );
}
