import React from "react";
import classes from "./Loader.module.css";

// аниминрованный круг
export default function Loader({ ...props }) {
    return (
        <>
            <div {...props} className={classes.loader}></div>

            {/* <div style={style} className={classes.loader_text}>
                Загрузка...
            </div> */}
        </>
    );
}