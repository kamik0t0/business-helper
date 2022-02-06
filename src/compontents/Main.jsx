import React from "react";
import AppRouter from "../AppRouter.jsx";
import classes from "./main.module.css";

export default function Main() {
    return (
        <div id="main" className={classes.main}>
            {/* В этот компонент открываются страницы */}
            <AppRouter classes={classes} />
        </div>
    );
}
